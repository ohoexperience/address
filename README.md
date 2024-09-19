# @ohochat/address 📌

[![NPM Version](https://img.shields.io/npm/v/@ohochat/address.svg?style=flat)](https://www.npmjs.com/package/@ohochat/address)
[![Typescript lang](https://img.shields.io/badge/Language-Typescript-Blue.svg)](https://www.typescriptlang.org)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![npm bundle size](https://img.shields.io/bundlephobia/min/%40ohochat%2Faddress)
](https://www.npmjs.com/package/@ohochat/address)

Introducing @ohochat/address - A Simplified Wrapper for Thailand Address Management
=====================================================================

Say goodbye to tedious address handling in Thailand! This lightweight package wraps around [thailand-geography-json](https://github.com/thailand-geography-data/thailand-geography-json) and empowers you to focus on building innovative features, rather than wrestling with data relationships and query filters.

With our package, you can effortlessly:

* Leverage pre-built relationships between address components
* Filter addresses by various criteria (e.g., province, district, etc.)
* Build robust address-based applications without worrying about the underlying complexity

By using @ohochat/address, you'll enjoy a more streamlined development experience and deliver high-quality results faster.


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

```typescript
import { Location } from '@ohochat/address';

const location = new Location();


const subdistrict = location.getSubdistrict('', {
    districtCode: 1001,
    postalCode: 10200,
    subdistrictCode: 100101,
    provinceCode: 10,
})
/* [{
    subdistrictCode: 100101,
    subdistrictName: 'พระบรมมหาราชวัง',
}] */


const district = location.getDistrict('พระ')
/* [{
    districtCode: 1009,
    districtName: 'พระโขนง',
}] */

const province = location.getProvince('ก')
/* [{
    provinceCode: 10,
    provinceName: 'กรุงเทพมหานคร',
}] */

const postalCode = location.getPostalCode('10260')
/* [{
    postalCode: 10260,
}] */

const geo = location.getGeography({
    districtCode: 1001,
    postalCode: 10200,
    subdistrictCode: 100101,
    provinceCode: 10,
})
/* [{
    districtCode: 1001,
    districtName: 'พระนคร',
    postalCode: 10200,
    provinceCode: 10,
    provinceName: 'กรุงเทพมหานคร',
    subdistrictCode: 100101,
    subdistrictName: 'พระบรมมหาราชวัง',
}] */
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

@ohochat/address has two types of tests:

-   Unit tests: `pnpm test`
-   Coverage tests: `pnpm test-coverage`
