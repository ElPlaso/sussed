
import useSWR from 'swr'

import { fetcher } from '../fetcher'

export default function useCampaignSusScore(id: string) {
    const score = useSWR<number, Error>(`/api/campaigns/${id}/scores/sus`, fetcher)

    return score
}