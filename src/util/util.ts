import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {
  Offers,
  ReviewsList,
  Review
} from '../types/Response';
import {
  CitiesList,
  NameSortList,
  ValueKey
} from '../const';

type Offer = {
  offersList: Offers;
  nameCitie?: string | undefined;
  nameSort?: string | undefined;
};

dayjs.extend(isSameOrBefore);

export const getSortOffersByCity = (offers: Offer): Offers => {
  const {offersList, nameCitie} = offers;
  let dataOffer: Offers = offersList;

  dataOffer = filterByCity(offersList, nameCitie);

  return dataOffer;
};

export const getSortOffersBySort = (offers: Offer): Offers => {
  const {offersList, nameSort} = offers;
  let dataOffer: Offers = offersList;

  dataOffer = filterBySort(offersList, nameSort);

  return dataOffer;
};

const filterByCity = (offersList: Offers, nameCitie: string | undefined) => {
  let dataOffer: Offers = [];
  switch(nameCitie) {
    case CitiesList.Paris:
      dataOffer = offersList.filter((offer) => {
        const {city:{name}} = offer;
        return name === nameCitie;
      });
      break;
    case CitiesList.Cologne:
      dataOffer = offersList.filter((offer) => {
        const {city:{name}} = offer;
        return name === nameCitie;
      });
      break;
    case CitiesList.Brussels:
      dataOffer = offersList.filter((offer) => {
        const {city:{name}} = offer;
        return name === nameCitie;
      });
      break;
    case CitiesList.Amsterdam:
      dataOffer = offersList.filter((offer) => {
        const {city:{name}} = offer;
        return name === nameCitie;
      });
      break;
    case CitiesList.Hamburg:
      dataOffer = offersList.filter((offer) => {
        const {city:{name}} = offer;
        return name === nameCitie;
      });
      break;
    case CitiesList.Dusseldorf:
      dataOffer = offersList.filter((offer) => {
        const {city:{name}} = offer;
        return name === nameCitie;
      });
      break;
  }

  return dataOffer;
};

const filterBySort = (offersList: Offers, nameSort: string | undefined) => {
  let dataOffer: Offers = [];
  switch(nameSort) {
    case NameSortList.Popular:
      dataOffer = offersList;
      break;
    case NameSortList['Price: high to low']:
      dataOffer = sortAscending(offersList.slice(), ValueKey.Price).reverse();
      break;
    case NameSortList['Price: low to high']:
      dataOffer = sortAscending(offersList.slice(), ValueKey.Price);
      break;
    case NameSortList['Top rated first']:
      dataOffer = sortAscending(offersList.slice(), ValueKey.Rating).reverse();
      break;
  }

  return dataOffer;
};

const sortAscending = (offersList: Offers, valueKey: 'price' | 'rating') => offersList.sort((a, b) => a[valueKey] - b[valueKey]);

export const humanizingData = (machineData: string) => ({
  ferstData: dayjs(machineData).format('MMMM/YYYY'),
  secondData: dayjs(machineData).format('YYYY/MM/DD')
});

export const filterLatestReviews = (reviews: ReviewsList) => {
  const sortReviews: ReviewsList = [];
  reviews.forEach((review: Review) => {
    if(
      dayjs().isSameOrBefore(review.date, 'year')
    ) {
      sortReviews.push(review);
    }
  });

  return sortReviews;
};

