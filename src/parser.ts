import * as core from '@actions/core';

const versionRegex = /^## \[(?<version>\d+\.\d+\.\d+)\](?:\(https?:\/\/[^)]*\))?\s?(?:\((?<date>\d{4}-\d{2}-\d{2})\))?$/;
const featureRegex = /^### (?<feature>.+)$/;
const itemRegex = /^\* (?<item>.+)$/;

function parseLine(line: string) {
    let versionParsed = versionRegex.exec(line);
    if(versionParsed) {
        const version = versionParsed.groups?.version;
        const date = versionParsed.groups?.date;

        let output =  `\n${'-'.repeat(99)}\nVersion: ${version}\n`;

        let info = `Found version ${version}`;
        if(date) {
            output += `Date: ${date}\n`;
            info += ` with date ${date}`;
        }
        core.info(info);
        return output;
    }
    let featureParsed = featureRegex.exec(line);
    if(featureParsed) {
        core.info(`Found feature group ${featureParsed.groups?.feature}`);
        return `  ${featureParsed.groups?.feature}:\n`;
    }
    let itemParsed = itemRegex.exec(line);
    if(itemParsed) {
        let itemText = itemParsed.groups?.item.split(' ([')[0];
        core.info(`Found line item ${itemText}`);
        return `    - ${itemText}\n`;
    }
    return '';
}

export function parse(inputContent: string) {
    let inputLines = inputContent.split(/\r\n|\r|\n/);

    let output = '';

    for(let line of inputLines) {
        output += parseLine(line);
    }

    return output.trim();
}