export interface CounterService {
  increase(id: string): Promise<number>
  get(id: string): Promise<number>
}
