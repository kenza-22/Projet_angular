import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrl: './suggestions-list.component.css'
})
export class SuggestionsListComponent {
  searchQuery: string = '';
  favoriteSuggestions: Suggestion[] = [];
  
  allSuggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l\'équipe.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      likes: 0,
      isFavorite: false
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      likes: 0,
      isFavorite: false
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Mise en place d\'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      likes: 0,
      isFavorite: false
    },
    {
      id: 4,
      title: 'Moderniser l\'interface utilisateur',
      description: 'Refonte complète de l\'interface utilisateur pour une meilleure expérience utilisateur.',
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'acceptee',
      likes: 0,
      isFavorite: false
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: 'Organisation d\'une formation sur les bonnes pratiques de sécurité informatique pour tous les employés.',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee',
      likes: 0,
      isFavorite: false
    }
  ];

  constructor(private router: Router) {}

  get suggestions(): Suggestion[] {
    if (!this.searchQuery.trim()) {
      return this.allSuggestions;
    }
    const query = this.searchQuery.toLowerCase();
    return this.allSuggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(query) ||
      suggestion.description.toLowerCase().includes(query) ||
      suggestion.category.toLowerCase().includes(query)
    );
  }

  likeSuggestion(suggestion: Suggestion): void {
    // Ne pas incrémenter si la suggestion est refusée
    if (suggestion.status === 'refusee') {
      return;
    }
    
    if (suggestion.likes !== undefined) {
      suggestion.likes++;
    } else {
      suggestion.likes = 1;
    }
  }

  toggleFavorite(suggestion: Suggestion): void {
    // Ne pas ajouter aux favoris si la suggestion est refusée
    if (suggestion.status === 'refusee') {
      return;
    }

    suggestion.isFavorite = !suggestion.isFavorite;
    
    if (suggestion.isFavorite) {
      // Ajouter à la liste des favoris si pas déjà présent
      const existingIndex = this.favoriteSuggestions.findIndex(fav => fav.id === suggestion.id);
      if (existingIndex === -1) {
        this.favoriteSuggestions.push(suggestion);
      }
    } else {
      // Retirer de la liste des favoris
      const index = this.favoriteSuggestions.findIndex(fav => fav.id === suggestion.id);
      if (index !== -1) {
        this.favoriteSuggestions.splice(index, 1);
      }
    }
  }

  toggleStatus(suggestion: Suggestion): void {
    if (suggestion.status === 'acceptee') {
      suggestion.status = 'refusee';
      // Retirer des favoris si elle y était
      if (suggestion.isFavorite) {
        suggestion.isFavorite = false;
        const index = this.favoriteSuggestions.findIndex(fav => fav.id === suggestion.id);
        if (index !== -1) {
          this.favoriteSuggestions.splice(index, 1);
        }
      }
    } else if (suggestion.status === 'refusee') {
      suggestion.status = 'acceptee';
    }
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      'acceptee': 'ACCEPTÉE',
      'refusee': 'REFUSÉE'
    };
    return statusMap[status] || status.toUpperCase();
  }

  formatDate(date: Date): string {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  isAccepted(status: string): boolean {
    return status === 'acceptee';
  }

  viewDetails(suggestionId: number): void {
    this.router.navigate(['/suggestions', suggestionId]);
  }
}
