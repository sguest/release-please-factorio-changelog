const versionRegex = /^## \[(?<version>\d+\.\d+\.\d+)\](?:\(https?:\/\/[^)]*\))?\s?(?:\((?<date>\d{4}-\d{2}-\d{2})\))?$/;
const featureRegex = /^### (?<feature>.+)$/;
const itemRegex = /^\* (?<item>.+)$/;

function parseLine(line: string) {
    let versionParsed = versionRegex.exec(line);
    if(versionParsed) {
        let output =  `\n${'-'.repeat(99)}\nVersion: ${versionParsed.groups?.version}\n`;
        if(versionParsed.groups?.date) {
            output += `Date: ${versionParsed.groups.date}\n`;
        }
        return output;
    }
    let featureParsed = featureRegex.exec(line);
    if(featureParsed) {
        return `  ${featureParsed.groups?.feature}:\n`;
    }
    let itemParsed = itemRegex.exec(line);
    if(itemParsed) {
        let itemText = itemParsed.groups?.item.split(' ([')[0];
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