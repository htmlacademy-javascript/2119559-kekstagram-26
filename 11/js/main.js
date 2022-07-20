import {drawMiniatures} from './draw-miniature.js';
import {createUploadFileForm} from './form-validation.js';
import {loadData} from './api.js';
import {doAfterFailure} from './handlers.js';


loadData((items) => { drawMiniatures(items); }, doAfterFailure);
createUploadFileForm();
