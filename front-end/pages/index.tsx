import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import Header from '../components/Header';
import UserService from '@/services/UserService';
import GuildCard from '@/components/GuildCard';
import { Guild, Board, User } from '@/types';
import BoardService from '@/services/BoardService';
import BoardCard from '@/components/BoardCard';

const Home: FC = () => {
  const [user, setUser] = useState<User>();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);

  const handleCreateClick = () => {
    //decorative for now
      console.log('Create button clicked!');
  };

  const fetchUserData = async () => {
    try {
      // default to logged in state to user1 for now
      const userData = await UserService.getUser('user1');
      setUser(userData);
      setGuilds(userData.guilds);
    } catch (error) {
      console.error('Error fetching user data', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleGuildClick = async (guildId: string) => {
    console.log(`Clicked on guild ${guildId}`);
    setSelectedGuildId(guildId);
    try {
      const fetchedBoards = await BoardService.getBoardsByGuild(guildId);
      setBoards(fetchedBoards);
    } catch (error) {
      console.error('Error fetching boards', error);
      
    }
  };

  return (
      <div className="bg-[#2C2F33] min-h-screen flex flex-col">
          <Head>
              <title>KanbanCord</title>
              <meta name="description" content="A Kanban board application inspired by Discord." />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header onCreateClick={handleCreateClick}></Header>
          <main className="flex-grow">
          <div className="p-4">
                {loading ? (
                    <p>Loading guilds...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {guilds.map(guild => (
                            <GuildCard key={guild.guildId} guild={guild} onClick={handleGuildClick} user={user!}/>
                        ))}
                    </div>
                )}
            </div>
            {selectedGuildId && (
                <div className="mt-8 p-4 bg-gray-800 rounded-lg m-4">
                    <h2 className="text-white text-xl font-bold">Boards</h2>
                    <div className="mt-4">
                        {boards.length === 0 ? (
                            <p>No boards available for this guild.</p>
                        ) : (
                            boards.map(board => (
                                <BoardCard key={board.boardId} board={board} />
                            ))
                        )}
                    </div>
                </div>
            )}
          </main>
      </div>
  );
};

export default Home;
