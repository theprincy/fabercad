import {PartsCatalog} from "./remotePartsBundle";
import {GitHubRepoRepository} from "../repository/GitHubRepoRepository";
import {GrCubes} from "react-icons/gr";
import {PartRepository} from "./partRepository";

const WEB_CAD_ORG_REPO = new GitHubRepoRepository('theprincy/web-cad', 'master');

export const WEB_CAD_ORG_COMMONS_CATALOG: PartsCatalog = Object.freeze({

  id: 'fabercad.com',
  name: 'Commons Parts',
  description: 'Public parts repository',
  icon: GrCubes,
  repo: WEB_CAD_ORG_REPO,
  metadataPath: 'commons.catalog.json',

});

export const WEB_CAD_ORG_PARTS_REPO: PartRepository = new PartRepository('fabercad.com', WEB_CAD_ORG_REPO, 'parts');
