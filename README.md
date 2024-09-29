# @ohochat/address 📌

[![NPM Version](https://img.shields.io/npm/v/@ohochat/address.svg?style=flat)](https://www.npmjs.com/package/@ohochat/address)
[![Typescript lang](https://img.shields.io/badge/Language-Typescript-Blue.svg)](https://www.typescriptlang.org)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohochat/address)
](https://www.npmjs.com/package/@ohochat/address)

Introducing @ohochat/address - A Simplified Wrapper for Thailand Address Management
=====================================================================

Say goodbye to tedious address handling in Thailand! This lightweight package wraps around [thailand-geography-json](https://github.com/thailand-geography-data/thailand-geography-json) and empowers you to focus on building innovative features, rather than wrestling with data relationships and query filters.

With our package, you can effortlessly:

* Leverage pre-built relationships between address components
* Filter addresses by various criteria (e.g., province, district, etc.)
* Build robust address-based applications without worrying about the underlying complexity

By using `@ohochat/address`, you'll enjoy a more streamlined development experience and deliver high-quality results faster.


## Usage

1.  Install the npm package:

```bash
# npm
npm i @ohochat/address

# yarn
yarn add @ohochat/address

# pnpm
pnpm i @ohochat/address
```

2. How to use it ? 🧐

@ohochat/address API
---

### Creating an instance
#### Location() -> Location
You can create a new instance of axios with a custom config.

```typescript
import { Location } from '@ohochat/address';

const location = new Location();
```

### Instance methods
The available instance methods are listed below. The specified config will be merged with the instance config.
#### Location.execute(options)
#### Location.execute(options, [, callback ]) // map
#### Location.execute(options, [, callback [, initail]]) // reduce

### Location Options
These are the available config options for making query address follow options that you provide. Otherwise you pass {} will get all address.
```typescript
{
    // there have 2 algorithm to be search

    // 1. these feilds is exact match with moi code

    // provinceCode is 2 digits like: 10
    provinceCode?: number
    // districtCode 4 digits like: 1001
    districtCode?: number
    // subDistrictCode 6 digits like: 1001
    subDistrictCode?: number

    // 2. these feilds is searching with start with algorithm
    // that mean you can give some of them ro all address well

    // province name: กรุง
    provinceName?: string
    // district name: บาง
    districtName?: string
    // sub district name: บาง
    subDistrictName?: string
    // postal code: 10
    postalCode?: number
}
```

### Use case
```typescript

// get address detail
const res = loc.execute({
    postalCode: 10270,
    subDistrictName: 'ปากน้ำ',
})
/*
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
*/

// get address detail and mapping data
const res1 = loc.execute(
    {
        provinceName: 'กรุง',
        districtName: 'บางนา',
        subDistrictName: 'บางนาใต้',
    },
    (row) => ({ a: `${row.provinceName} ${row.postalCode}` }),
)
/*
[
    {
        a: 'กรุงเทพมหานคร 10260',
    },
]
*/

// get address detail and restucture data
const res2 = loc.execute(
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
/*
Set(1) { 'กรุงเทพมหานคร' }
*/
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

`@ohochat/address` has two types of tests:
-   Unit tests: `pnpm test`
-   Coverage tests: `pnpm test-coverage`
