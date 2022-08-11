import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Card, RwsTarotCard, Spread } from './spread.model';

// Don't declare interfaces inside functions
interface TarotReq {
  cards: RwsTarotCard[];
  nhits: number;
}

const newPosition = (): Card => ({
  position: '',
  isFaceUp: false,
});

export const initialState = {
  title: '',
  cards: [],
};

const API_URL = 'https://rws-cards-api.herokuapp.com/api/v1/cards/random';

@Injectable({
  providedIn: 'root',
})
export class SpreadService {
  // When using BehaviorSubject, you don't really need to keep track of the values in a separate property
  // The inner value can be accessed via the value property of the subject
  // This allows you to update the BehaviorSubject values just like you would update a state in react
  private spread = new BehaviorSubject<Spread>(initialState);

  spread$ = this.spread.asObservable();

  constructor(private http: HttpClient) {}

  setSpread(spread: Spread): void {
    this.spread.next(spread);
  }

  setTitle(title: string): void {
    this.spread.next({ ...this.spread.value, title });
  }

  addPosition(): void {
    this.spread.next({
      ...this.spread.value,
      cards: [...this.spread.value.cards, newPosition()],
    });
  }

  updatePosition(i: number, value: string): void {
    const cards = [...this.spread.value.cards];
    cards[i].position = value;

    this.spread.next({ ...this.spread.value, cards });
  }

  removePosition(i: number): void {
    const cards = [...this.spread.value.cards];
    cards.splice(i, 1);

    this.spread.next({ ...this.spread.value, cards });
  }

  // FIXME Should this be in a util file?
  // FIXME Should this be strictly/union typed?
  generateImgUrl(card: RwsTarotCard): string {
    const suit = card.suit ? card.suit.slice(0, 1) : 'm';
    const num = String(card.value_int).padStart(2, '0');

    return `assets/card-img/${suit}${num}.jpg`;
  }

  fetchCards() {
    const numOfCards = this.spread.value.cards.length;
    const req = this.http.get<TarotReq>(`${API_URL}?n=${numOfCards}`);

    return req.pipe(
      // The tap operator is used to perform side effects which don't affect the observable's output
      tap((data) => {
        const cards = this.spread.value.cards.map((card, i) => ({
          i,
          img: this.generateImgUrl(data.cards[i]),
          ...card,
          ...data.cards[i],
        }));

        this.spread.next({ ...this.spread.value, cards });
      })
    );
  }

  // Avoid setting return types in typescript, let the compiler infer the return types for you when possible
  flipCard(i: number) {
    const cards = [...this.spread.value.cards];
    cards[i].isFaceUp = !cards[i].isFaceUp;

    this.spread.next({ ...this.spread.value, cards });
  }
}
