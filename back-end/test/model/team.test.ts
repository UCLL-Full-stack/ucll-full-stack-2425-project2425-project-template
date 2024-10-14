import { Coach } from "../../model/coach";
import { Player } from "../../model/player";
import { Team } from "../../model/team";

const validTeamName = "UCLLTeam";
const validCoach = new Coach({firstName: "Mark", lastName: "Theman", email: "marktheman@ucll.be", phoneNumber: "0412345679"});
const validPlayer = new Player({firstName: "John", lastName: "Doe", email: "johndoe@ucll.be", phoneNumber: "0412345678"});
const validPlayer2 = new Player({firstName: "Jane", lastName: "Doe", email: "janedoe@ucll.be", phoneNumber: "0498765445"});

test('givenValidPlayers_whenCreatingTeam_thenTeamIsCreatedSuccessfully', () => {
    //given
    //when
    const team = new Team({teamName: validTeamName, players: [validPlayer, validPlayer2], coach: validCoach});
    
    //then
    expect(team.getTeamName()).toEqual(validTeamName);
    expect(team.getCoach()).toEqual(validCoach);
    expect(team.getPlayers()).toContain(validPlayer);
    expect(team.getPlayers()).toContain(validPlayer2);
});

test('givenValidPlayerAndTeam_whenAddingPlayerToTeam_thenPlayerIsAddedSuccessfully', () => {
    //given
    const team = new Team({teamName: validTeamName, players: [validPlayer], coach: validCoach});
    //when
    team.addPlayer(validPlayer2);
    //then
    expect(team.getPlayers()).toContain(validPlayer2);
});

test('givenValidPlayerAndTeam_whenRemovingPlayerFromTeam_thenPlayerIsRemovedSuccessfully', () => {
    //given
    const team = new Team({teamName: validTeamName, players: [validPlayer, validPlayer2], coach: validCoach});
    //when
    team.removePlayer(validPlayer);
    //then
    expect(team.getPlayers()).not.toContain(validPlayer);
});

test('givenValidTeamAndCoach_whenUpdatingCoach_thenCoachIsUpdatedSuccessfully', () => {
    //given
    const team = new Team({teamName: validTeamName, players: [validPlayer], coach: validCoach});
    const newCoach = validCoach;
    //when
    team.updateCoach(newCoach);
    //then
    expect(team.getCoach()).toEqual(newCoach);
})