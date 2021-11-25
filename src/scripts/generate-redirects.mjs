/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// Generates the Netlify _redirects file from the moved files in the Git history.

import fs from 'fs/promises'

import { getMovedPagesFromHistory } from './getMovedPagesFromHistory.mjs'

const manualRedirectsLines = [
    '# Manual redirects added in generate-redirects.mjs',
    '/private/*  200!  Role=teammate',
    '/private/*  /login  401!',
]

let lines = manualRedirectsLines.join('\n')

const movedPages = await getMovedPagesFromHistory()
const redirectLines = movedPages.map(({ source, destination }) => `${source} ${destination}`).join('\n')

lines += '\n# Generated by generate-redirects.mjs from Git history'
lines += `\n${redirectLines}\n`

console.log('Redirects:\n', lines)

await fs.writeFile(new URL('../../out/_redirects', import.meta.url), lines)
