import Competition from '../../model/competition';
import Team from '../../model/team';

test('Given: valid values for competition, when: competition is created, then: competition is created with those values', () => {
    // Given
    const team1 = new Team({ id: 1, name: 'Team A'});
    const team2 = new Team({ id: 2, name: 'Team B'});

    const competitionData = {
        id: 1,
        name: 'Championship',
        teams: [team1, team2]
    };

    // When
    const competition = new Competition(competitionData);

    // Then
    expect(competition.getId()).toEqual(competitionData.id);
    expect(competition.getName()).toEqual(competitionData.name);
    expect(competition.getTeams()).toEqual(competitionData.teams);
});
