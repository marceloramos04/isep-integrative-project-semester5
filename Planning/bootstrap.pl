% agendas of the surgery rooms
agenda_operation_room(or1, 20241028, [(520, 579, so999991), (1000, 1059, so999992)]).
agenda_operation_room(or2, 20241028, [(420, 539, so999993), (550, 689, so999994), (780, 959, so999995)]).
agenda_operation_room(or3, 20241028, [(480, 599, so999996), (630, 839, so999997)]).
agenda_operation_room(or4, 20241028, [(480, 569, so999998), (600, 689, so999999)]).

% surgery types
surgery(so2,45,60,45).
surgery(so3,45,90,45).
surgery(so4,45,75,45).

% surgery operations
surgery_id(so100001,so2).
surgery_id(so100002,so3).
surgery_id(so100003,so4).
surgery_id(so100004,so2).
surgery_id(so100005,so4).
