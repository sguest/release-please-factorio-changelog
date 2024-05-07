import * as core from '@actions/core';
import { parse } from './parser';
import fs from 'fs';

async function run() {
    const inputFile = core.getInput('input-file');
    const outputFile = core.getInput('output-file');

    const inputContent = fs.readFileSync(inputFile, 'utf-8');

    const outputContent = parse(inputContent);

    fs.writeFileSync(outputFile, outputContent);
}

run();