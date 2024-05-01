interface ResultDataset {
    MakeAGraph?: string;
    accessible?: string;
    cdm_data_type?: string;
    class?: string;
    dataStructure?: string;
    datasetID?: string;
    email?: string;
    fgdc?: string;
    files?: string;
    griddap?: string;
    infoUrl?: string;
    institution?: string;
    iso19115?: string;
    latitudeSpacing?: number;
    longitudeSpacing?: number;
    maxAltitude?: number | null;
    maxLatitude?: number;
    maxLongitude?: number;
    maxTime?: string;
    metadata?: string;
    minAltitude?: number | null;
    minLatitude?: number;
    minLongitude?: number;
    minTime?: string;
    outOfDate?: number;
    rss?: string;
    sos?: string;
    sourceUrl?: string;
    subset?: string;
    summary?: string;
    tabledap?: string;
    testOutOfDate?: string;
    timeSpacing?: number;
    title?: string;
    wcs?: string;
    wms?: string;
}

export function getInstitutionsSearchResults(results: ResultDataset[]): string[] {

    const uniqueInstitutionsSet: Set<string> = new Set();
    results.forEach(result => {
        if (result.institution) {
            // Add institution to the Set
            uniqueInstitutionsSet.add(result.institution);
        }
    });
    const uniqueInstitutions: string[] = Array.from(uniqueInstitutionsSet);
    return uniqueInstitutions;
}