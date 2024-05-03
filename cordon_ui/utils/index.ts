import { ResultDataset } from "@/types/types";


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


// export function filterResultsByInstitutions(results: ResultDataset[] | undefined, institutions: string[]): ResultDataset[] | undefined {
//     // Filter the results based on the institutions array
//     if (results) {
//         return results.filter(result => {
//             // Check if the institution of the result is included in the institutions array
//             return institutions.includes(result.institution || '');
//         });
//     }

// }

export function filterResultsByInstitutions(results: ResultDataset[] | undefined, institutions: string[]): ResultDataset[]  | undefined {
    if (!results) return undefined;
    // Map through the results array
    return results.map(result => {
        // Check if the institution of the result is included in the institutions array
        const hidden = institutions.length === 0 ? false : !institutions.includes(result.institution || '');
        // Add hidden key to the result object
        return { ...result, hidden };
    });
}