:- dynamic room_and_occupied_time/2.
:- dynamic operation_and_assigned_room/2.
% :- consult('../provided-code/project_operation_room_scheduling3.pl').

surgery(so2,45,60,45).
surgery(so3,45,90,45).
surgery(so4,45,75,45).

surgery_id(so100001,so2).
surgery_id(so100002,so3).
surgery_id(so100003,so4).

agenda_operation_room(or1, [(520,579,so100000),(1000,1059,so099999)]).
agenda_operation_room(or2, [(420,539,so999993),(550,689,so999994),(780,959,so999995)]).
agenda_operation_room(or3, [(480,599,so999996),(630,839,so999997)]).

% calculates de total of occupied time of the room´s agenda
get_occupied_time([], 0).
get_occupied_time([(Begin, End, _) | Agenda_T], Result):-
    get_occupied_time(Agenda_T, Result1),
    Result is (End - Begin + 1) + Result1.

% --------------------------------------------------

setup_rooms_and_occupied_times(RoomsAndAgendas):-
    write('>>> Started setup_rooms_and_occupied_times/1 ...'), nl,nl,
    retractall(room_and_occupied_time(_, _)),
    setup_rooms_and_occupied_times1(RoomsAndAgendas),
    write('>>> Finished setup_rooms_and_occupied_times/1 ...'), nl,nl,nl.
    
setup_rooms_and_occupied_times1([]).
setup_rooms_and_occupied_times1([(Room_H, Agenda_H) | RoomsAgendas_T]):-
    get_occupied_time(Agenda_H, OccupiedTime_H),
    assertz(room_and_occupied_time(Room_H, OccupiedTime_H)),
    write('Room = '), write(Room_H), write(', Occupied Time = '), write(OccupiedTime_H), nl,nl,
    setup_rooms_and_occupied_times1(RoomsAgendas_T).

% --------------------------------------------------

get_least_occupied_room(RoomsOccupiedTimes, Result):-
    write('>>> Started get_least_occupied_room/2 ...'), nl,nl,
    get_least_occupied_room1(RoomsOccupiedTimes, _, Result), !,
    write('>>> Finished get_least_occupied_room/2 ...'), nl,nl,nl.

get_least_occupied_room1([], 1440, _).
get_least_occupied_room1([(ThisRoom, ThisOccupiedTime) | RoomsOccupiedTimes_T], MinOccupiedTime, Result):-
    get_least_occupied_room1(RoomsOccupiedTimes_T, MinOccupiedTime1, Result1),
    write('Current Min Occupied Time = '), write(MinOccupiedTime1), nl,
    write('Room = '), write(ThisRoom), nl, 
    write('Occupied Time = '), write(ThisOccupiedTime), nl,nl,
    (
        (
            ThisOccupiedTime < MinOccupiedTime1,
            Result = ThisRoom,
            write('New Least Occupied Room = '), write(Result), nl,
            MinOccupiedTime is ThisOccupiedTime,
            write('New Min Occupied Time = '), write(MinOccupiedTime), nl,nl
        );
        (
            MinOccupiedTime is MinOccupiedTime1,
            Result = Result1
        )
    ),
    write('---------------------------------------'), nl, nl.

% --------------------------------------------------

assign_operations(Operations, RoomsAgendas, AssignedOperations):-
    write('>>> Started assign_operations/3 ...'), nl,nl,
    setup_rooms_and_occupied_times(RoomsAgendas),
    % findall((Room, OccupiedTime), room_and_occupied_time(Room, OccupiedTime), RoomsOccupiedTimes),
    retractall(operation_and_assigned_room(_, _)),
    assign_operations1(Operations, AssignedOperations),
    write('>>> Finished assign_operations/3 ...'), nl,nl,nl.

assign_operations1([], AssignedOperations):-
    findall((Operation, AssignedRoom), operation_and_assigned_room(Operation, AssignedRoom), AssignedOperations).

assign_operations1([Operations_H | Operations_T], AssignedOperations):-
    findall((Room, OccupiedTime), room_and_occupied_time(Room, OccupiedTime), RoomsOccupiedTimes),
    get_least_occupied_room(RoomsOccupiedTimes, LeastOccupiedRoom),
    assertz(operation_and_assigned_room(Operations_H, LeastOccupiedRoom)),
    surgery_id(Operations_H, OperationType), % get Operation Type of the assigned Operation
    surgery(OperationType, P1, P2, P3), % get duration of each phase of the Operation
    OperationDuration is P1 + P2 + P3, % calculate total duration of the Operation
    room_and_occupied_time(LeastOccupiedRoom, OccupiedTime), % get occupied time of the assigned Room
    NewOccupiedTime is OccupiedTime + OperationDuration, % add duration of the assigned Operation to the occupied time of the Room
    retract(room_and_occupied_time(LeastOccupiedRoom, _)), % clean old occupied time of the Room
    assertz(room_and_occupied_time(LeastOccupiedRoom, NewOccupiedTime)), % set new occupied time of the Room
    write('OPERATION ASSIGNED - Room = '), write(LeastOccupiedRoom), write(', Previous Occupied Time = '), write(OccupiedTime), write(', New Occupied Time = '), write(NewOccupiedTime), nl,nl,nl,
    assign_operations1(Operations_T, AssignedOperations).

% --------------------------------------------------

% Example of use:

% assign_operations(
%     [so100001, so100002, so100003], 
%     [ 
%         (or1, [(520,579,so100000),(1000,1059,so099999)]),
%         (or2, [(420,539,so999993),(550,689,so999994),(780,959,so999995)]),
%         (or3, [(480,599,so999996),(630,839,so999997)])
%     ],
%     AssignedOperations).

% assign_operations( [so100001, so100002, so100003], [ (or1, [(520,579,so100000),(1000,1059,so099999)]), (or2, [(420,539,so999993),(550,689,so999994),(780,959,so999995)]), (or3, [(480,599,so999996),(630,839,so999997)]) ], AssignedOperations).
