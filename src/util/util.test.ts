import {
  getSortOffersByCity,
  getSortOffersBySort,
  humanizingData,
  filterLatestReviews,
  checkEmail,
  checkPassword,
  sortOffersByCity,
  getRandomNumber
} from './util';
import {
  mockOffersForPrice,
  mockOffersForRating,
  mockOffersByCity
} from './mock-util';
import {
  NameSortList,
  CitiesList
} from '../const';
import { reviews } from '../mocks/reviews';
import { offers } from '../mocks/offers';

describe('Test util function', () => {
  describe('Test util function "getSortOffersByCity"', () => {
    test(`Function "getSortOffersByCity" accepts parameter:
    "Hamburg", returns a list of offers for city "Hamburg"`, () => {
      expect(getSortOffersByCity({
        offersList: mockOffersForPrice,
        nameCitie: CitiesList.Hamburg,
      })).toEqual([mockOffersForPrice[1],mockOffersForPrice[4]]);
    });
    test(`Function "getSortOffersByCity" accepts parameter:
    "Amsterdam", returns a list of offers for city "Amsterdam"`, () => {
      expect(getSortOffersByCity({
        offersList: mockOffersForPrice,
        nameCitie: CitiesList.Amsterdam,
      })).toEqual([]);
    });
    test(`Function "getSortOffersByCity" accepts parameter:
    "Paris", returns a list of offers for city "Paris"`, () => {
      expect(getSortOffersByCity({
        offersList: mockOffersForPrice,
        nameCitie: CitiesList.Paris,
      })).toEqual([mockOffersForPrice[0]]);
    });
  });
  describe('Test util function "getSortOffersBySort"', () => {
    test(`Function "getSortOffersBySort" accepts parameter:
    "Price: low to high", returns a list of offers for price
    in ascending order`, () => {
      expect(getSortOffersBySort({
        offersList: mockOffersForPrice,
        nameSort: NameSortList['Price: low to high'],
      })).toEqual(mockOffersForPrice);
    });
    test(`Function "getSortOffersBySort" accepts parameter:
      "Price: high to low", returns a list of offers for price
      in descending order`, () => {
      expect(getSortOffersBySort({
        offersList: mockOffersForPrice,
        nameSort: NameSortList['Price: high to low'],
      })).toEqual(mockOffersForPrice.slice().reverse());
    });
    test(`Function "getSortOffersBySort" accepts parameter:
    "Popular", returns a list of offers in original condition`, () => {
      expect(getSortOffersBySort({
        offersList: mockOffersForPrice,
        nameSort: NameSortList.Popular,
      })).toEqual(mockOffersForPrice);
    });
    test(`Function "getSortOffersBySort" accepts parameter:
    "Top rated first", returns a list of offers of offers for price
    in descending order`, () => {
      expect(getSortOffersBySort({
        offersList: mockOffersForRating,
        nameSort: NameSortList.Popular,
      })).toEqual(mockOffersForRating);
    });
  });
  describe('Test util function "humanizingData"', () => {
    test(`Function "humanizingData" return:
    ferstData: May/2023
    secondData: 2023/11/05`, () => {
      expect(humanizingData('2023-05-05T11:13:09.372Z').ferstData).toBe('May/2023');
      expect(humanizingData('2023-11-05T11:13:09.372Z').secondData).toBe('2023/11/05');
    });
  });
  describe('Test util function "filterLatestReviews"', () => {
    test(`Function sorts reviews from
    earliest to latest`, () => {
      expect(filterLatestReviews(reviews)).toEqual([
        {
          id: 3,
          user: {
            id: 11,
            isPro: false,
            name: 'Jack',
            avatarUrl: 'https://12.react.pages.academy/static/avatar/2.jpg'
          },
          rating: 2,
          comment: 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
          date: '2023-11-05T11:13:09.372Z'
        },
        {
          id: 4,
          user: {
            id: 11,
            isPro: false,
            name: 'Jack',
            avatarUrl: 'https://12.react.pages.academy/static/avatar/2.jpg'
          },
          rating: 4.7,
          comment: 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
          date: '2023-05-05T11:13:09.372Z'
        },
        {
          id: 2,
          user: {
            id: 11,
            isPro: false,
            name: 'Jack',
            avatarUrl: 'https://12.react.pages.academy/static/avatar/2.jpg'
          },
          rating: 3.4,
          comment: 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
          date: '2023-07-05T11:13:09.372Z'
        }
      ]);
    });
  });
  describe('Test util function "checkEmail"', () => {
    test('Checking email for correctness', () => {
      expect(checkEmail('vlad@vankov.ru')).toBeTruthy();
    });
    test('Checking for invalid email', () => {
      expect(checkEmail('vlad.ru')).toBeFalsy();
    });
  });
  describe('Test util function "checkPassword"', () => {
    test('Checking password for correctness', () => {
      expect(checkPassword('V1')).toBeTruthy();
    });
    test('Checking for invalid password', () => {
      expect(checkPassword('V!')).toBeFalsy();
    });
  });
  describe('Test util function "sortOffersByCity"', () => {
    test('Sort offers by city', () => {
      expect(sortOffersByCity(offers)).toEqual(mockOffersByCity);
    });
  });
  describe('Test util function "getRandomNumber"', () => {
    test('Checking for a random number', () => {
      expect(getRandomNumber(0, 5)).not.toBeNull();
      expect(getRandomNumber(0,5)).not.toBeUndefined();
    });
  });
});
