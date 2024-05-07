import { parse } from './parser'

describe('parser', () => {
    it('should parse changelog', () => {
        const input = `#Changelog

## [2.0.0](https://github.com/example) (2024-05-05)


### Features

* some feature with hash and URL ([ghhash01](https://example.com))
* some feature without hash and URL

### Bug Fixes

* a bug fix

## [0.1.5] (2024-04-03)


### Features

* foo

## [0.1.4]


### Features

* bar

## [0.1.0](https://github.com/example)


### Another category

* a feature with (parenthetical) section ([hfice321](https://example.com))`
        const expectedOutput = `---------------------------------------------------------------------------------------------------
Version: 2.0.0
Date: 2024-05-05
  Features:
    - some feature with hash and URL
    - some feature without hash and URL
  Bug Fixes:
    - a bug fix

---------------------------------------------------------------------------------------------------
Version: 0.1.5
Date: 2024-04-03
  Features:
    - foo

---------------------------------------------------------------------------------------------------
Version: 0.1.4
  Features:
    - bar

---------------------------------------------------------------------------------------------------
Version: 0.1.0
  Another category:
    - a feature with (parenthetical) section`

        const output = parse(input);

        expect(output).toBe(expectedOutput);
    })
})