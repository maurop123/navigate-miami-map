export const locations = [{
  name: 'Ironhack',
  categories: ['Education'],
  latLon: [25.776, -80.196],
  address: '120 SW 8th St, Miami, FL 33130',
  website: {
    url: 'http://http://www.ironhack.com/en',
    text: 'www.ironhack.com/en',
  },
}, {
  name: 'Watsco Ventures',
  categories: ['Accelerator'],
  latLon: [25.731, -80.236],
  address: '2665 S Bayshore Dr, Miami, FL 33133',
  website: {
    url: 'www.watscoventures.com',
    text: 'http://www.watscoventures.com/',
  },
}]

export const categories = [{
  name: 'Education',
  icon: 'school',
}, {
  name: 'Accelerator',
  icon: 'directions_run',
}]

export default {
  locations,
  categories,
}
