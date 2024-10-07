import { Publication } from 'src/app/models/publication'

export abstract class PublicationRepository {
  abstract init(): Promise<void>
  abstract getPublications(): Promise<Publication[]>
  abstract getPublication(id: string): Promise<Publication | undefined>
  abstract addPublication(publication: Publication): Promise<boolean>
  abstract updatePublication(publication: Publication): Promise<boolean>
  abstract deletePublication(id: string): Promise<boolean>
}
