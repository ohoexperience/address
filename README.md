# Address for Thailand

[![NPM Version](https://img.shields.io/npm/v/@ohochat/address.svg?style=flat)](https://www.npmjs.com/package/@ohochat/address)
[![Typescript lang](https://img.shields.io/badge/Language-Typescript-Blue.svg)](https://www.typescriptlang.org)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohochat/address)
](https://www.npmjs.com/package/@ohochat/address)

Introducing `address` — a no-nonsense Thailand address helper.

This lightweight package empowers you to focus on building address features faster, rather than wrestling with complexity of address handling. It embraces framework-agnostic and isomorphic design — meaning it can be used with any libraries and works on both client and server out-of-the-box.

With this package, you can effortlessly:

* Leverage pre-built relationships between address components
* Filter addresses by various criteria e.g. postcode, province, district and sub district.
* Build robust address-based applications without worrying about the underlying complexity

By using `address`, you'll enjoy a more streamlined development experience and deliver high-quality results faster.


This package is designed and brought to you by [Oho Chat](https://www.oho.chat) — the No. 1 customer support and sale management platform! 

## Getting Started

Install the package:

```bash
# npm
npm i @ohochat/address

# yarn
yarn add @ohochat/address

# pnpm
pnpm i @ohochat/address
```


## Location

Use **Location** to find addresses with search constraints.

### Creating an instance

```typescript
import { Location } from '@ohochat/address';

const location = new Location();
```

You can create a new instance of **Location**. A Location let you query addresses based on your criteria, resulting in one or more matched addresses (or zero if not matched!). An address is made up from the following **components**:

- postalCode
- provinceName (changwat)
- districtName (amphoe)
- subDistrctName (tambon)

These components can be refered to by a standardized numerical code in 2, 4 and 6 digits. For example, code `10` is "กรุงเทพมหานคร", `1001` is "เขตบางรัก กรุงเทพมหานคร" and `100403` is "แขวงสุริยวงศ์ เขตบางรัก กรุงเทพมหานคร". You can use the following **codes** in an address interchangeably with the textual components.

- provinceCode
- districtCode
- subDistricteCode

### Find Location Address

Find addresses using queries. The resulting addresses can be passed to mapping or map-reduce function for convenience.

```typescript
// Find address
Location.execute(query)
Location.execute(query, callback) // map results
Location.execute(query, callback, initialValue) // map reduce results

// Example Result
[
    {
        postalCode: 10270,
        provinceCode: 11,
        provinceName: 'สมุทรปราการ',
        districtCode: 1101,
        districtName: 'เมืองสมุทรปราการ',
        subDistrictCode: 110101,
        subDistrictName: 'ปากน้ำ',
    },
    // ... more addresses
]
```

#### Location Query

These are the available query options for searching by address components or codes. There are 2 ways to find addresses:

1. Exact match using MOI code.
2. Partial match using address component.

You can mix exact and partial matches in a single query. Otherwise, you can pass `{}` and get all of the addresses (why not!).

```typescript


{
    // 1. Exact match using MOI code

    // provinceCode in 2 digits like 11
    provinceCode?: number

    // districtCode in 4 digits like 1101
    districtCode?: number

    // subDistrictCode in 6 digits like 110101
    subDistrictCode?: number

    // 2. Partial match using address component

    // province name beginning with กรุง
    provinceName?: string

    // district name beginning with บาง
    districtName?: string

    // sub district name beginning with บาง
    subDistrictName?: string

    // postal code beginning with 10
    postalCode?: number
}
```


### Use Cases
```typescript
// Get address details
const results1 = location.execute({
    postalCode: 10270,
    subDistrictName: 'ปากน้ำ',
})

// results1
[
    {
        districtCode: 1101,
        districtName: 'เมืองสมุทรปราการ',
        postalCode: 10270,
        provinceCode: 11,
        provinceName: 'สมุทรปราการ',
        subDistrictCode: 110101,
        subDistrictName: 'ปากน้ำ',
    },
]


// Get address details and mapping data
const results2 = location.execute(
    {
        provinceName: 'กรุง',
        districtName: 'บางนา',
        subDistrictName: 'บางนาใต้',
    },
    (row) => ({ a: `${row.provinceName} ${row.postalCode}` }),
)
// results2
[
    {
        a: 'กรุงเทพมหานคร 10260',
    },
]


// Get address detail and restucture data
const results3 = location.execute(
    {
        provinceName: 'กรุง',
        districtName: 'บางนา',
    },
    (acc, row) => {
        acc.add(row.provinceName)
        return acc
    },
    new Set<string>(),
)
// results3
Set(1) { 'กรุงเทพมหานคร' }
```

## Development

### Initial Setup

1.  Clone the project from github:

    ```bash
    git clone git@github.com:ohoexperience/address.git
    ```

2.  Install the dependencies:

    ```bash
    # npm
    npm i

    # yarn
    yarn

    # pnpm
    pnpm
    ```

### Testing

`address` has two types of tests:
-   Unit tests: `pnpm test`
-   Coverage tests: `pnpm test-coverage`


## Data Source

The address data is sourced from and managed by [thailand-geography-json](https://github.com/thailand-geography-data/thailand-geography-json). Kudos to the team for their great works!


## License

MIT © [Oho Chat](https://github.com/ohoexperience). See [LICENSE](https://github.com/ohoexperience/address/blob/main/LICENSE) for details.