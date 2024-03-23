import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'
import { encode, decode } from 'js-base64';

// const { persistAtom } = recoilPersist({
//   key: 'recoil-persist', // this key is using to store data in local storage
//   storage: sessionStorage, // configurate which stroage will be used to store the data
// })

// 20230110 add'js-base64
const localStorageBase64 = () => {
  return {
    setItem: (key, value) => {
      sessionStorage.setItem(encode(key), encode(value))
    },
    getItem: (key) => {
      const getItem =  sessionStorage.getItem(encode(key))
      return getItem && decode(getItem) || {}
    },
    clear: () => {
      sessionStorage.clear()
    },
  }
}
const { persistAtom } = recoilPersist({ key: 'recoil-persist', storage: localStorageBase64() })

export const dataGridDummyState = atom({
  key: 'dataGridDummyState',
  // default: { row: [false,1,2,3,4,5] }
  // default: ['1111111'],
  default:  [{
    ID: 1,
    Status:1,
    StatusCaption:"有効",
    personalLimit:900,





    FirstName: 'John',
    LastName: 'Heart',
    Position: 'CEO',
    BirthDate: '1964/03/16',
    HireDate: '1995/01/15',
    Title: 'Mr.',
    Address: '351 S Hill St.',
    City: 'Los Angeles',
    State: 'California',
    Zipcode: 90013,
    Email: 'jheart@dx-email.com',
    Skype: 'jheartDXskype',
    HomePhone: '(213) 555-9208',
    DepartmentID: 6,
    MobilePhone: '(213) 555-9392',
  }, {
    ID: 2,
    Status:2,
    StatusCaption:"無効",
    personalLimit:3400,



    FirstName: 'Olivia',
    LastName: 'Peyton',
    Position: 'Sales Assistant',
    BirthDate: '1981/06/03',
    HireDate: '2012/05/14',
    Title: 'Mrs.',
    Address: '807 W Paseo Del Mar',
    City: 'Los Angeles',
    State: 'California',
    Zipcode: 90036,
    Email: 'oliviap@dx-email.com',
    Skype: 'oliviapDXskype',
    HomePhone: '(310) 555-2728',
    DepartmentID: 5,
    MobilePhone: '(818) 555-2387',
  }, {
    ID: 3,
    Status:2,
    StatusCaption:"有効",
    personalLimit:5500,

    FirstName: 'Robert',
    LastName: 'Reagan',
    Position: 'CMO',
    BirthDate: '1974/09/07',
    HireDate: '2002/11/08',
    Title: 'Mr.',
    Address: '4 Westmoreland Pl.',
    City: 'Bentonville',
    State: 'Arkansas',
    Zipcode: 91103,
    Email: 'robertr@dx-email.com',
    Skype: 'robertrDXskype',
    HomePhone: '(818) 555-2438',
    DepartmentID: 6,
    MobilePhone: '(818) 555-2387',
  }, {
    ID: 4,
    Status:2,
    StatusCaption:"有効",
    personalLimit:3400,


    FirstName: 'Greta',
    LastName: 'Sims',
    Position: 'HR Manager',
    BirthDate: '1977/11/22',
    HireDate: '1998/04/23',
    Title: 'Ms.',
    Address: '1700 S Grandview Dr.',
    State: 'Georgia',
    City: 'Atlanta',
    Zipcode: 91803,
    Email: 'gretas@dx-email.com',
    Skype: 'gretasDXskype',
    HomePhone: '(818) 555-0976',
    DepartmentID: 5,
    MobilePhone: '(818) 555-6546',
  }, {
    ID: 5,
    Status:1,
    StatusCaption:"有効",
    personalLimit:590,


    FirstName: 'Brett',
    LastName: 'Wade',
    Position: 'IT Manager',
    BirthDate: '1968/12/01',
    HireDate: '2009/03/06',
    Title: 'Mr.',
    Address: '1120 Old Mill Rd.',
    State: 'Idaho',
    City: 'Boise',
    Zipcode: 91108,
    Email: 'brettw@dx-email.com',
    Skype: 'brettwDXskype',
    HomePhone: '(626) 555-5985',
    DepartmentID: 7,
    MobilePhone: '(626) 555-0358',
  }, {
    ID: 6,
    Status:1,
    StatusCaption:"有効",
    personalLimit:3450,

    FirstName: 'Sandra',
    LastName: 'Johnson',
    Position: 'Controller',
    BirthDate: '1974/11/15',
    HireDate: '2005/05/11',
    Title: 'Mrs.',
    Address: '4600 N Virginia Rd.',
    State: 'Utah',
    City: 'Beaver',
    Zipcode: 90807,
    Email: 'sandraj@dx-email.com',
    Skype: 'sandrajDXskype',
    HomePhone: '(562) 555-8272',
    DepartmentID: 5,
    MobilePhone: '(562) 555-2082',
  }, {
    ID: 7,
    Status:1,
    StatusCaption:"有効",
    personalLimit:50,

    FirstName: 'Kevin',
    LastName: 'Carter',
    Position: 'Shipping Manager',
    BirthDate: '1978/01/09',
    HireDate: '2009/08/11',
    Title: 'Mr.',
    Address: '424 N Main St.',
    State: 'California',
    City: 'San Diego',
    Zipcode: 90012,
    Email: 'kevinc@dx-email.com',
    Skype: 'kevincDXskype',
    HomePhone: '(213) 555-8038',
    DepartmentID: 3,
    MobilePhone: '(213) 555-2840',
  }, {
    ID: 8,
    Status:1,
    StatusCaption:"有効",
    personalLimit:9999,

    FirstName: 'Cynthia',
    LastName: 'Stanwick',
    Position: 'HR Assistant',
    BirthDate: '1985/06/05',
    HireDate: '2008/03/24',
    Title: 'Ms.',
    Address: '2211 Bonita Dr.',
    City: 'Little Rock',
    State: 'Arkansas',
    Zipcode: 90265,
    Email: 'cindys@dx-email.com',
    Skype: 'cindysDXskype',
    HomePhone: '(818) 555-6808',
    DepartmentID: 4,
    MobilePhone: '(818) 555-6655',
  }, {
    ID: 9,
    Status:1,
    StatusCaption:"有効",
    personalLimit:250,

    FirstName: 'Kent',
    LastName: 'Samuelson',
    Position: 'Ombudsman',
    BirthDate: '1972/09/11',
    HireDate: '2009/04/22',
    Title: 'Dr.',
    Address: '12100 Mora Dr',
    City: 'St. Louis',
    State: 'Missouri',
    Zipcode: 90272,
    Email: 'kents@dx-email.com',
    Skype: 'kentsDXskype',
    HomePhone: '(562) 555-1328',
    DepartmentID: 26,
    MobilePhone: '(562) 555-9282',
  }, {
    ID: 10,
    Status:1,
    StatusCaption:"有効",
    personalLimit:3400,


    FirstName: 'Taylor',
    LastName: 'Riley',
    Position: 'Network Admin',
    BirthDate: '1982/08/14',
    HireDate: '2012/04/14',
    Title: 'Mr.',
    Address: '7776 Torreyson Dr',
    City: 'San Jose',
    State: 'California',
    Zipcode: 90012,
    Email: 'taylorr@dx-email.com',
    Skype: 'taylorrDXskype',
    HomePhone: '(310) 555-9712',
    DepartmentID: 5,
    MobilePhone: '(310) 555-7276',
  }, {
    ID: 11,
    Status:1,
    StatusCaption:"有効",
    personalLimit:50,
    

  }, {
    ID: 12,
    Status:1,
    StatusCaption:"有効",
    personalLimit:55500,
    

  }, {
    ID: 13,
    Status:1,
    StatusCaption:"有効",
    personalLimit:50,
    

  }, {
    ID: 14,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 15,
    Status:1,
    StatusCaption:"有効",
    personalLimit:5500,
    

  }, {
    ID: 16,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 17,
    Status:1,
    StatusCaption:"有効",
    personalLimit:777,
    

  }, {
    ID: 18,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 19,
    Status:1,
    StatusCaption:"有効",
    personalLimit:55500,
    

  }, {
    ID: 20,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 21,
    Status:1,
    StatusCaption:"有効",
    personalLimit:777,
    

  }, {
    ID: 22,
    Status:1,
    StatusCaption:"有効",
    personalLimit:5500,
    

  }, {
    ID: 23,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 24,
    Status:1,
    StatusCaption:"有効",
    personalLimit:777,
    

  }, {
    ID: 25,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 26,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 27,
    Status:1,
    StatusCaption:"有効",
    personalLimit:5500,
    

  }, {
    ID: 28,
    Status:1,
    StatusCaption:"有効",
    personalLimit:777,
    

  }, {
    ID: 29,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 30,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 31,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 32,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 33,
    Status:1,
    StatusCaption:"有効",
    personalLimit:777,
    

  }, {
    ID: 34,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 35,
    Status:1,
    StatusCaption:"有効",
    personalLimit:55500,
    

  }, {
    ID: 36,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 37,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 38,
    Status:1,
    StatusCaption:"有効",
    personalLimit:5500,
    

  }, {
    ID: 39,
    Status:1,
    StatusCaption:"有効",
    personalLimit:777,
    

  }, {
    ID: 40,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 41,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 42,
    Status:1,
    StatusCaption:"有効",
    personalLimit:3400,
    

  }, {
    ID: 43,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 44,
    Status:1,
    StatusCaption:"有効",
    personalLimit:777,
    

  }, {
    ID: 45,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 46,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 47,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 48,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 49,
    Status:1,
    StatusCaption:"有効",
    personalLimit:9999,
    

  }, {
    ID: 50,
    Status:1,
    StatusCaption:"有効",
    personalLimit:55500,
    

  }, {
    ID: 51,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 52,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 53,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 54,
    Status:1,
    StatusCaption:"有効",
    personalLimit:9999,
    

  }, {
    ID: 55,
    Status:1,
    StatusCaption:"有効",
    personalLimit:55500,
    

  }, {
    ID: 56,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 57,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 58,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 59,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 60,
    Status:1,
    StatusCaption:"有効",
    personalLimit:500,
    

  }, {
    ID: 61,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 62,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 63,
    Status:1,
    StatusCaption:"有効",
    personalLimit:250,
    

  }, {
    ID: 64,
    Status:1,
    StatusCaption:"有効",
    personalLimit:5500,
    

  }, {
    ID: 65,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 66,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 67,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 68,
    Status:1,
    StatusCaption:"有効",
    personalLimit:9999,
    

  }, {
    ID: 69,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 70,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 71,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 72,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 73,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 74,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 75,
    Status:1,
    StatusCaption:"有効",
    personalLimit:9999,
    

  }, {
    ID: 76,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 77,
    Status:1,
    StatusCaption:"有効",
    personalLimit:900,
    

  }, {
    ID: 78,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 79,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 80,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 81,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 82,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 83,
    Status:1,
    StatusCaption:"有効",
    personalLimit:5500,
    

  }, {
    ID: 84,
    Status:1,
    StatusCaption:"有効",
    personalLimit:900,
    

  }, {
    ID: 85,
    Status:1,
    StatusCaption:"有効",
    personalLimit:900,
    

  }, {
    ID: 86,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 87,
    Status:1,
    StatusCaption:"有効",

    

  }, {
    ID: 88,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 89,
    Status:1,
    StatusCaption:"有効",
    personalLimit:900,
    

  }, {
    ID: 90,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 91,
    Status:1,
    StatusCaption:"有効",
    personalLimit:55500,
    

  }, {
    ID: 92,
    Status:1,
    StatusCaption:"有効",
    personalLimit:30,
    

  }, {
    ID: 93,
    Status:1,
    StatusCaption:"有効",
    personalLimit:900,
    

  }, {
    ID: 94,
    Status:1,
    StatusCaption:"有効",
    personalLimit:250,
    

  }, {
    ID: 95,
    Status:1,
    StatusCaption:"有効",
    personalLimit:333,
    

  }, {
    ID: 96,
    Status:1,
    StatusCaption:"有効",
    personalLimit:900,
    

  }, {
    ID: 97,
    Status:1,
    StatusCaption:"有効",
    personalLimit:250,
    

  }, {
    ID: 98,
    Status:1,
    personalLimit:900,
    StatusCaption:"有効",

    

  }, {
    ID: 99,
    Status:1,
    personalLimit:400,
    StatusCaption:"有効",

    

  }, {
    ID: 100,
    Status:1,
    personalLimit:300,
    StatusCaption:"有効",

    

  }








],
  effects_UNSTABLE: [persistAtom]
})
