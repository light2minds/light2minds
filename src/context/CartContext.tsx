'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  tag?: string
  tier?: string
}

type CartState = { items: CartItem[]; isOpen: boolean }

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QTY'; id: string; qty: number }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' }

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const idx = state.items.findIndex(i => i.id === action.item.id)
      const items = idx >= 0
        ? state.items.map((i, j) => j === idx ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...action.item, quantity: 1 }]
      return { ...state, items, isOpen: true }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY':
      if (action.qty < 1) return { ...state, items: state.items.filter(i => i.id !== action.id) }
      return { ...state, items: state.items.map(i => i.id === action.id ? { ...i, quantity: action.qty } : i) }
    case 'OPEN_CART': return { ...state, isOpen: true }
    case 'CLOSE_CART': return { ...state, isOpen: false }
    case 'CLEAR_CART': return { items: [], isOpen: false }
    default: return state
  }
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  openCart: () => void
  closeCart: () => void
  clearCart: () => void
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })
  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0)
  return (
    <CartContext.Provider value={{
      items: state.items, isOpen: state.isOpen,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', item: { ...item, quantity: 1 } }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
      updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }),
      openCart: () => dispatch({ type: 'OPEN_CART' }),
      closeCart: () => dispatch({ type: 'CLOSE_CART' }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      subtotal, itemCount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
