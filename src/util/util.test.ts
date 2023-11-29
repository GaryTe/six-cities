import {
  getSortOffersByCity,
  getSortOffersBySort
} from './util';
import {
  mockOffersForPrice,
  mockOffersForRating
} from './mock-util';
import {
  NameSortList,
  CitiesList
} from '../const';

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
});
