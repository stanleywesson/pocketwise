import Dexie, { type EntityTable } from 'dexie'

// --- Types ---
export interface Household {
  id: string
  name: string
}

export interface Profile {
  id: string
  householdId: string
  name: string
  avatarColor: string
}

export interface Account {
  id: string
  householdId: string
  name: string
  type: 'checking' | 'savings' | 'cash' | 'credit'
  openingBalance: number
}

export interface Category {
  id: string
  householdId: string
  name: string
  icon: string
  color: string
  isDefault: boolean
}

export interface Transaction {
  id: string
  householdId: string
  accountId: string
  categoryId: string
  amount: number
  type: 'income' | 'expense'
  description: string
  date: string
}

export interface Budget {
  id: string
  householdId: string
  categoryId: string
  month: string
  monthlyLimit: number
}

// --- DB ---
const db = new Dexie('PocketWiseDB') as Dexie & {
  households:   EntityTable<Household,   'id'>
  profiles:     EntityTable<Profile,     'id'>
  accounts:     EntityTable<Account,     'id'>
  categories:   EntityTable<Category,    'id'>
  transactions: EntityTable<Transaction, 'id'>
  budgets:      EntityTable<Budget,      'id'>
}

db.version(1).stores({
  households:   '&id',
  profiles:     '&id, householdId',
  accounts:     '&id, householdId, type',
  categories:   '&id, householdId',
  transactions: '&id, householdId, accountId, categoryId, date, type',
  budgets:      '&id, householdId, categoryId, month',
})

export default db
