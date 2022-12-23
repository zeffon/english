export interface SymbolProps {
  id: number
  bbc_idx?: number
  name: string
  yingyutu: {
    aid: string
    page: number
  }
  bbc?: {
    aid: string
    page: number
  }
}
