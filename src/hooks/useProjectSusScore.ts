
import useSWR from 'swr'

import { fetcher } from '../fetcher'

export default function useProjectSusScore(id: string) {
    const score = useSWR<number, Error>(`/api/projects/${id}/scores/sus`, fetcher)

    return score
}