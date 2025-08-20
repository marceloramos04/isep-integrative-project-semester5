% Importar funções do arquivo Planning/project_operation_room_scheduling1.pl
:- consult('./room-scheduling-2.pl').


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Operation Types %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%surgery(SurgeryType,TAnesthesia,TSurgery,TCleaning).

surgery(so2, 30, 180, 30).
surgery(so3, 30, 120, 30).
surgery(so4, 30, 120, 30).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Staff %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

staff(d001,doctor,anaesthetist,[so2,so3,so4]).
staff(d002,doctor,orthopaedist,[so2,so3,so4]).
staff(d003,doctor,orthopaedist,[so2,so3,so4]).

staff(n001,nurse,anaesthetist,[so2,so3,so4]).
staff(n002,nurse,instrumenting,[so2,so3,so4]).
staff(n003,nurse,circulating,[so2,so3,so4]).
staff(n004,nurse,circulating,[so2,so3,so4]).

staff(a001,assistant,medical_action,[so2,so3,so4]).
staff(a002,assistant,medical_action,[so2,so3,so4]).
staff(a003,assistant,medical_action,[so2,so3,so4]).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Staff Timetable %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

timetable(d001,20241028,(480,1320)).
timetable(d002,20241028,(420,1320)).
timetable(d003,20241028,(540,1440)).

timetable(n001,20241028,(360,1380)).
timetable(n002,20241028,(540,1320)).
timetable(n003,20241028,(420,1380)).
timetable(n004,20241028,(600,1440)).

timetable(a001,20241028,(300,1320)).






%timetable(d001,20241028,(480,1200)).
%timetable(d002,20241028,(720,1440)).
%timetable(d003,20241028,(600,1320)).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Staff Agenda %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

agenda_staff(d001,20241028,[(480,600,m01),(780,960,c01)]).
agenda_staff(d002,20241028,[(420,540,m02),(840,960,m02),(1140,1200,c02)]).
agenda_staff(d003,20241028,[(780,960,m01),(1320,1440,m02)]).

agenda_staff(n001,20241028,[(360,540,m01),(1320,1380,m02)]).
agenda_staff(n002,20241028,[(780,960,m01)]).
agenda_staff(n003,20241028,[(420,600,m01),(840,960,m02)]).
agenda_staff(n004,20241028,[(780,960,m01),(1320,1440,m02)]).

agenda_staff(a001,20241028,[(300,600,m01)]).






%agenda_staff(d001,20241028,[(720,840,m01),(1080,1200,c01)]).
%agenda_staff(d002,20241028,[(780,900,m02),(901,960,m02),(1080,1440,c02)]).
%agenda_staff(d003,20241028,[(720,840,m01),(900,960,m02)]).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Operations to Schedule %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


surgery_id(so100001,so2).
surgery_id(so100002,so3).
surgery_id(so100003,so4).
% surgery_id(so100004,so2).
% surgery_id(so100005,so4).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Assigned Operations %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

assignment_surgery(so100001,d001).
assignment_surgery(so100001,d002).
assignment_surgery(so100001,n001).
assignment_surgery(so100001,n002).
assignment_surgery(so100001,a001).

assignment_surgery(so100002,d001).
assignment_surgery(so100002,d003).
assignment_surgery(so100002,n001).
assignment_surgery(so100002,n003).
assignment_surgery(so100002,a001).

assignment_surgery(so100003,d001).
assignment_surgery(so100003,d002).
assignment_surgery(so100003,d003).
assignment_surgery(so100003,n001).
assignment_surgery(so100003,n002).
assignment_surgery(so100003,n003).
assignment_surgery(so100003,a001).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Room Agenda %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

agenda_operation_room(or1,20241028,[(781,990,so099999)]).


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%