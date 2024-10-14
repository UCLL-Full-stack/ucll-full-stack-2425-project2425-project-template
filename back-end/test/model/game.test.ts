import { Coach } from "../../model/coach";
import { Game } from "../../model/game";
import { Player } from "../../model/player";
import { Team } from "../../model/team";
import { set } from "date-fns/set";

const validDate = set(new Date(), { hours: 15, minutes: 30 });
const validResult = '0 - 1'
const validPlayer = new Player({firstName: "John", lastName: "Doe", email: "johndoe@ucll.be", phoneNumber: "0412345678"});
const validPlayer2 = new Player({firstName: "Jane", lastName: "Doe", email: "janedoe@ucll.be", phoneNumber: "0498765445"});
const validPlayer3 = new Player({firstName: "Anne", lastName: "Mieke", email: "annemieke@ucll.be", phoneNumber: "0498765465"});
const validPlayer4 = new Player({firstName: "Mike", lastName: "Jones", email: "mikejones@ucll.be", phoneNumber: "0498765544"});
const validCoach = new Coach({firstName: "Mark", lastName: "Theman", email: "marktheman@ucll.be", phoneNumber: "0412345679"});
const validCoach2 = new Coach({firstName: "Sarah", lastName: "Smith", email: "sarahsmith@ucll.be", phoneNumber: "0498764565"});
const validTeamName = "UCLLTeam";
const validTeamName2 = "UCLLTeam2";
const validTeam =  new Team({teamName: validTeamName, players: [validPlayer, validPlayer2], coach: validCoach});
const validTeam2 = new Team({teamName: validTeamName2, players: [validPlayer3, validPlayer4], coach: validCoach2});

test('given: valid values, when: creating game, then: game is successfully created', () => {
    //given

    //when
    const game = new Game({date: validDate, teams: [validTeam, validTeam2]})

    //then
    expect(game.getDate()).toEqual(validDate);
    expect(game.getTeams()).toContain(validTeam);
    expect(game.getTeams()).toContain(validTeam2);
    expect(game.getResult()).toEqual(validResult);
});