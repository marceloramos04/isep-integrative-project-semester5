:- use_module(library(plunit)).
:- consult('../../bootstrap.pl').
:- consult('../../Services/assign_operations.pl').

:- begin_tests(get_occupied_time).

test(empty_agenda):-
    get_occupied_time([], 0).

test(partially_occupied_agenda):-
    get_occupied_time([(480, 599, _), (630, 839, _)], 330).

test(fully_occupied_agenda):-
    get_occupied_time([(0, 499, _), (500, 799, _), (800, 1439, _)], 1440).

:- end_tests(get_occupied_time).

% -------------------------------------------------------

% :- begin_tests(get_occupancy_rate).

% test(empty_agenda):-
%     get_occupancy_rate([], 0).

% test(partially_occupied_agenda):-
%     get_occupancy_rate([(480, 599, _), (630, 839, _)], 0.23).

% test(fully_occupied_agenda):-
%     get_occupancy_rate([(0, 499, _), (500, 799, _), (800, 1439, _)], 1).

% test(empty_agenda, [true(R == 0)]):-
%     get_occupancy_rate(0, R).

% test(partially_occupied_agenda, [true(R == 0.23)]):-
%     get_occupancy_rate(330, R).

% test(fully_occupied_agenda, [true(R == 1)]):-
%     get_occupancy_rate(1440, R).

% :- end_tests(get_occupancy_rate).

% -------------------------------------------------------

:- begin_tests(get_least_occupied_room).

% test(least_occupied_room_r2, [true(R == r2)]):-
%     get_least_occupied_room([(r1, [(480, 599, _), (630, 839, _)]), (r2, [(400, 499, _)]), (r3, [(0, 1299, _)])], R).

% test(least_occupied_room_r1, [true(R == r1)]):-
%     get_least_occupied_room([(r1, [(400, 499, _)]), (r2, [(480, 599, _), (630, 839, _)]), (r3, [(0, 1299, _)])], R).

% test(least_occupied_room_r3, [true(R == r3)]):-
%     get_least_occupied_room([(r1, [(480, 599, _), (630, 839, _)]), (r2, [(0, 1299, _)]), (r3, [(400, 499, _)])], R).

% test(several_rooms_with_same_occupancy_rate, [true(R == r2)]):-
%     get_least_occupied_room([(r1, [(400, 499, _)]), (r2, [(400, 499, _)]), (r3, [(480, 599, _), (630, 839, _)])], R).

test(least_occupied_room_r2, [true(R == r2)]):-
    get_least_occupied_room([(r1, 800), (r2, 200), (r3, 600)], R).

test(least_occupied_room_r1, [true(R == r1)]):-
    get_least_occupied_room([(r1, 300), (r2, 600), (r3, 950)], R).

test(least_occupied_room_r3, [true(R == r3)]):-
    get_least_occupied_room([(r1, 400), (r2, 955), (r3, 100)], R).

test(several_rooms_with_same_occupancy_rate, [true(R == r2)]):-
    get_least_occupied_room([(r1, 100), (r2, 100), (r3, 400)], R).

:- end_tests(get_least_occupied_room).