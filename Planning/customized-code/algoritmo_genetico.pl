:- dynamic geracoes/1.
:- dynamic populacao/1.
:- dynamic prob_cruzamento/1.
:- dynamic prob_mutacao/1.
:- dynamic custo_objetivo/1.
:- dynamic geracoes_anteriores/1.

% cirurgia(ID, Sala, Duracao, InicioDesejado, Penalizacao).
cirurgia(c1, 1, 2, 5, 1).
cirurgia(c2, 1, 4, 7, 6).
cirurgia(c3, 2, 1, 11, 2).
cirurgia(c4, 2, 3, 9, 3).
cirurgia(c5, 1, 3, 8, 2).

salas(2).

inicializa :-
    write('Numero de novas Geracoes: '),
    read(NG),
    (integer(NG), NG > 0 ->
        (retractall(geracoes(_)), asserta(geracoes(NG)));
        (write('Erro: Numero de geracoes invalido.'), nl, fail)),

    write('Dimensao da Populacao: '),
    read(DP),
    (integer(DP), DP > 0 ->
        (retractall(populacao(_)), asserta(populacao(DP)));
        (write('Erro: Dimensao da populacao invalida.'), nl, fail)),

    write('Probabilidade de Cruzamento (%): '),
    read(P1),
    (number(P1), P1 >= 0, P1 =< 100 ->
        (PC is P1 / 100, retractall(prob_cruzamento(_)), asserta(prob_cruzamento(PC)));
        (write('Erro: Probabilidade de cruzamento invalida.'), nl, fail)),

    write('Probabilidade de Mutacao (%): '),
    read(P2),
    (number(P2), P2 >= 0, P2 =< 100 ->
        (PM is P2 / 100, retractall(prob_mutacao(_)), asserta(prob_mutacao(PM)));
        (write('Erro: Probabilidade de mutacao invalida.'), nl, fail)),

    write('Custo objetivo (maximo permitido): '),
    read(CO),
    (number(CO), CO > 0 ->
        (retractall(custo_objetivo(_)), asserta(custo_objetivo(CO)));
        (write('Erro: Custo objetivo invalido.'), nl, fail)),

    retractall(geracoes_anteriores(_)),
    asserta(geracoes_anteriores([])),

    write('Inicializacao concluida com sucesso.'), nl.

gera_geracao(G, G, Pop) :- !, write('Geracao final: '), nl, write(Pop), nl.

gera_geracao(N, G, Pop) :-
    current_time(T0),
    avalia_populacao(Pop, PopAvaliada),
    ordena_populacao(PopAvaliada, PopOrdenada),
    custo_objetivo(CO),
    (populacao_estavel(PopOrdenada) ->
        write('Populacao estabilizou na geracao '), write(N), nl;
    PopOrdenada = [Melhor*V|_], V =< CO ->
        write('Custo objetivo atingido na geracao '), write(N), nl, write('Melhor Solucao: '), write(Melhor), nl;
    elapsed_time(T0, Tempo), Tempo > 600 ->
        write('Tempo limite atingido.'), nl;
    cruzamento_aleatorio(PopOrdenada, PopCruzada),
    mutacao(PopCruzada, PopMutada),
    elitismo(PopMutada, ProximaPop),
    N1 is N + 1,
    gera_geracao(N1, G, ProximaPop)).

gera_populacao(Pop) :-
    populacao(TamPop),
    findall(C, cirurgia(C, _, _, _, _), Cirurgias),
    gera_individuos(TamPop, Cirurgias, Pop).

gera_individuos(0, _, []) :- !.
gera_individuos(TamPop, Cirurgias, [Ind|Resto]) :-
    random_permutation(Cirurgias, Ind),
    TamPop1 is TamPop - 1,
    gera_individuos(TamPop1, Cirurgias, Resto).

cruzamento([], []).
cruzamento([Ind1*_, Ind2*_|Resto], [NovoInd1, NovoInd2|NovosResto]) :-
    prob_cruzamento(Pcruz),
    random(0.0, 1.0, Prob),
    (Prob =< Pcruz ->
        cruzar(Ind1, Ind2, NovoInd1),
        cruzar(Ind2, Ind1, NovoInd2);
        NovoInd1 = Ind1, NovoInd2 = Ind2),
    cruzamento(Resto, NovosResto).

cruzar(Pai1, Pai2, Filho) :-
    length(Pai1, Tam),
    random(1, Tam, Ponto),
    length(P1, Ponto), append(P1, _, Pai1),
    subtract(Pai2, P1, Resto),
    append(P1, Resto, Filho).

avalia_populacao([], []).
avalia_populacao([Ind|Rest], [Ind*Custo|RestAvaliada]) :-
    avalia(Ind, Custo),
    avalia_populacao(Rest, RestAvaliada).

avalia([], 0).
avalia([Cirurgia|Resto], Custo) :-
    cirurgia(Cirurgia, Sala, Duracao, InicioDesejado, Penalizacao),
    calcula_tempo(Sala, _, Duracao, TempoInicio),
    Penalidade is abs(TempoInicio - InicioDesejado) * Penalizacao,
    avalia(Resto, CustoRestante),
    Custo is Penalidade + CustoRestante.

calcula_tempo(Sala, _, Duracao, TempoInicio) :- 
    findall(Fim, (cirurgia(_, Sala, Duracao, _, _), Fim is Duracao), Tempos),
    (Tempos = [] -> TempoInicio is 0; max_list(Tempos, UltimoTempo), TempoInicio is UltimoTempo + Duracao).

ordena_populacao(PopAvaliada, PopOrdenada) :-
    sort(2, @=<, PopAvaliada, PopOrdenada).

populacao_estavel(PopOrdenada) :-
    geracoes_anteriores(Anterior),
    Anterior == PopOrdenada,
    !.
populacao_estavel(PopOrdenada) :-
    retractall(geracoes_anteriores(_)),
    asserta(geracoes_anteriores(PopOrdenada)),
    fail.

cruzamento_aleatorio(Pop, PopCruzada) :-
    random_permutation(Pop, PopAleatoria),
    cruzamento(PopAleatoria, PopCruzada).

elitismo(Pop, NovaPop) :-
    populacao(TamPop),
    round(TamPop * 0.2, NumElitistas),
    length(Elitistas, NumElitistas),
    append(Elitistas, Restante, Pop),
    random_permutation(Restante, Permutados),
    append(Elitistas, Permutados, NovaPopFinal),
    length(NovaPop, TamPop), append(NovaPopFinal, _, NovaPop).

mutacao([], []).
mutacao([Ind|Rest], [NInd|RestMutada]) :-
    prob_mutacao(Pmut),
    random(0.0, 1.0, Prob),
    (Prob < Pmut -> mutacao_ind(Ind, NInd); NInd = Ind),
    mutacao(Rest, RestMutada).

mutacao_ind(Ind, NInd) :-
    random_select(E1, Ind, Rest1),
    random_select(E2, Rest1, Rest2),
    swap(E1, E2, Ind, NInd).

swap(E1, E2, [E1|T], [E2|T]).
swap(E1, E2, [E2|T], [E1|T]).
swap(E1, E2, [H|T], [H|R]) :- swap(E1, E2, T, R).

current_time(Time) :- get_time(Time).
elapsed_time(Start, Elapsed) :- current_time(Now), Elapsed is Now - Start.
