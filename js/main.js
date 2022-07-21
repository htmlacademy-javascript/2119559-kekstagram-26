import {drawMiniatures} from './draw-miniature.js';
import {createUploadFileForm} from './form-validation.js';
import {loadData} from './api.js';
import {doAfterFailure} from './handlers.js';
import {showFilters} from './filter-all-pictures.js';
import {debounce} from './utils.js';

loadData((items) => { drawMiniatures(items); showFilters(items, debounce(drawMiniatures)); }, doAfterFailure);
createUploadFileForm();
