import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import Header from '../components/Header';
import UserService from '@/services/UserService';
import GuildCard from '@/components/GuildCard';
import { Guild, Board, User, KanbanPermission } from '@/types';
import BoardService from '@/services/BoardService';
import BoardCard from '@/components/BoardCard';
import CreateBoardForm from '@/components/CreateBoardForm';
import dotenv from 'dotenv';
import { useUser } from '@/context/UserContext';

dotenv.config();

const Home: FC = () => {
  const { user, setUser} = useUser();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [displayGuilds, setDisplayGuilds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [selectedGuildForBoardCreation, setSelectedGuildForBoardCreation] = useState<string | null>(null);
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [permissions, setPermissions] = useState<any[]>([]);


  const handleDiscordLogin = () => {
    const redirectUri = `http://localhost:8080/api/auth/discord`;
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify guilds`;
  };


  const handleCreateClick = (guildId?: string) => {
    if(guildId) {
      setSelectedGuildForBoardCreation(guildId);
    }
    setIsFormOpen(true);
    console.log('Create button clicked!');
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedGuildForBoardCreation(null);
  }

  const handleFormSubmit = async (boardData: { boardName: string; columns: string[]; guild: string }) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }
    if(boardData.columns.length === 0) {
      boardData.columns = ['To Do', 'In Progress', 'Done'];
    } else {
      boardData.columns = boardData.columns.map(column => column.trim());
    }
    const boardPayload = {
      boardName: boardData.boardName,
      createdByUserId: user.userId,
      guildId: boardData.guild,
      columns: boardData.columns,
      permissions: []
    };

    try {
      await BoardService.createBoard(boardPayload);
      console.log('Created board with data:', boardPayload);
      if (selectedGuildId) {
        const fetchedBoards = await BoardService.getBoardsByGuild(selectedGuildId);
        console.log('Fetched boards:', fetchedBoards);
        setBoards(fetchedBoards || []);
    }
    } catch (error) {
      console.error('Error creating board', error);
    }
    handleFormClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = sessionStorage.getItem('user');
        const sessionGuilds = JSON.parse(sessionStorage.getItem('guilds') || '[]');
        if(storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          const dbGuilds = await UserService.getGuilds(parsedUser.userId);
          const displayGuilds = sessionGuilds.map((guild: any)=> {
            const inDb = dbGuilds.some((dbGuild: any)=> dbGuild.guildId === guild.id);
            return {
              ...guild,
              greyedOut: !inDb && !guild.botInGuild,
            };
          })
          setGuilds(dbGuilds);
          displayGuilds.sort((a: any, b: any) => a.greyedOut - b.greyedOut);
          setDisplayGuilds(displayGuilds);
          const permissions = await Promise.all(dbGuilds.map(async (guild: { guildId: string; }) => {
            const permission = await UserService.getUserGuildKanbanPermissions(parsedUser.userId, guild.guildId);
            return {guildId: guild.guildId, permissions: permission };
          }));
          setPermissions(permissions);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setUser]);

  const handleGuildClick = async (guild: any) => {
    if (guild.greyedOut && guild.inviteLink) {
      window.open(guild.inviteLink, '_blank');
    } else if (!guild.greyedOut) {
      setSelectedGuildId(guild.guildId || guild.id);
      try {
          const fetchedBoards = await BoardService.getBoardsByGuild(guild.guildId);
          setBoards(fetchedBoards || []);
      } catch (error) {
          console.error('Error fetching boards', error);
      }
    }
  };

  return (
      <div className="bg-[#2C2F33] min-h-screen flex flex-col">
          <Head>
              <title>KanbanCord</title>
              <meta name="description" content="A Kanban board application inspired by Discord." />
              <link rel="icon" href="/images/kanbancord.png" />
          </Head>
          <Header onCreateClick={handleCreateClick} onLoginClick={handleDiscordLogin}></Header>
          <main className="flex-grow">
            {selectedBoard ? (
                <div className="p-4">
                    <h2 className="text-white text-xl font-bold">{selectedBoard.boardName}</h2>
                </div>
            ) : (
              <>
                <div className="p-4">
                  {loading && user ? (
                      <p>Loading guilds...</p>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {displayGuilds.map(guild => (
                              <GuildCard key={guild.guildId} guild={guild} onClick={handleGuildClick} onCreateClick={handleCreateClick}/>
                          ))}
                      </div>
                  )}
                </div>
                {selectedGuildId && (
                <div className="mt-8 p-4 bg-gray-800 rounded-lg m-4">
                    <h2 className="text-white text-xl font-bold">Boards</h2>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                        {boards.length === 0 ? (
                            <p>No boards available for this server.</p>
                        ) : (
                            boards.map(board => (
                                <BoardCard key={board.boardId} board={board} />
                            ))
                        )}
                      </div>
                    </div>
                  )}
                <CreateBoardForm 
                    isOpen={isFormOpen} 
                    onClose={handleFormClose} 
                    onSubmit={handleFormSubmit} 
                    selectedGuildId={selectedGuildForBoardCreation}
                    user={user!}
                    guilds={guilds}
                    permissions={permissions}
                />
              </>
            )}

          </main>
      </div>
  );
};

export default Home;
