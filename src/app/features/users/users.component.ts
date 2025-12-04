import { Component } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  searchQuery: string = '';
  selectedRole: string = 'all';
  selectedDepartment: string = 'all';

  allUsers: User[] = [
    {
      id: 1,
      firstName: 'Kenza',
      lastName: 'Baccar',
      email: 'kenzabaccar@gmail.com',
      role: 'Administrateur',
      department: 'IT',
      isActive: true,
      joinDate: new Date('2024-01-15')
    },
    {
      id: 2,
      firstName: 'Molka',
      lastName: 'Ghazouani',
      email: 'molkaghazouani@gmail.com',
      role: 'Développeur',
      department: 'IT',
      isActive: true,
      joinDate: new Date('2025-03-20')
    },
    {
      id: 3,
      firstName: 'Rahma',
      lastName: 'Balloumi',
      email: 'rahmaballoumi@gmail.com',
      role: 'Designer',
      department: 'Design',
      isActive: true,
      joinDate: new Date('2025-05-10')
    },
    {
      id: 4,
      firstName: 'Khalil',
      lastName: 'Abdelmoumen',
      email: 'khalilabdelmoumen@gmail.com',
      role: 'Manager',
      department: 'Ressources Humaines',
      isActive: true,
      joinDate: new Date('2025-11-05')
    },
    {
      id: 5,
      firstName: 'Ahmed',
      lastName: 'Ali',
      email: 'ahmedali@gmail.com',
      role: 'Designer',
      department: 'Design',
      isActive: false,
      joinDate: new Date('2025-01-08')
    },
    {
      id: 6,
      firstName: 'Nadhem',
      lastName: 'Hmida',
      email: 'nadhemhmida@gmail.com',
      role: 'Développeur',
      department: 'IT',
      isActive: true,
      joinDate: new Date('2025-09-12')
    }
  ];

  get users(): User[] {
    let filtered = this.allUsers;

    // Filtre par recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query)
      );
    }

    // Filtre par rôle
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    // Filtre par département
    if (this.selectedDepartment !== 'all') {
      filtered = filtered.filter(user => user.department === this.selectedDepartment);
    }

    return filtered;
  }

  get uniqueRoles(): string[] {
    return Array.from(new Set(this.allUsers.map(user => user.role)));
  }

  get uniqueDepartments(): string[] {
    return Array.from(new Set(this.allUsers.map(user => user.department)));
  }

  getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }

  formatDate(date: Date): string {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  getTotalUsers(): number {
    return this.allUsers.length;
  }

  getActiveUsers(): number {
    return this.allUsers.filter(user => user.isActive).length;
  }
}
