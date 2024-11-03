import gameRepository from '../../repository/game.db';
import { Game } from '../../model/game';

describe('Game Repository', () => {
  it('should return all games when getAllGames is called', () => {
    const games = gameRepository.getAllGames();
    expect(games.length).toBe(5);  // 5 adet oyun olmasını bekleriz
    expect(games[0]).toBeInstanceOf(Game);  // İlk oyun nesnesi Game sınıfından olmalı
  });

  it('should return the correct game when getGameById is called with a valid ID', () => {
    const game = gameRepository.getGameById(1);  // ID'si 1 olan oyunu arıyoruz
    expect(game).toBeDefined();
    expect(game?.getTitle()).toBe('Epic Quest');  // Bu oyunun başlığının "Epic Quest" olmasını bekleriz
  });

  it('should return null when getGameById is called with an invalid ID', () => {
    const game = gameRepository.getGameById(999);  // Geçerli olmayan bir ID
    expect(game).toBeNull();
  });

  it('should return games with correct properties', () => {
    const games = gameRepository.getAllGames();
    const game = games.find((g) => g.getId() === 2);

    expect(game).toBeDefined();
    expect(game?.getTitle()).toBe('Battle Arena');
    expect(game?.getCategories()).toEqual(['Fighting', 'Action']);  // Kategorilerin doğru ayarlandığını doğrula
    expect(game?.getPrice()).toBe(39.99);  // Fiyat doğrulaması
    expect(game?.getDiscount()).toBe(10);  // İndirim doğrulaması
  });
});
