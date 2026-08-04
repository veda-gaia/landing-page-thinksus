import { isDocumentRequired } from './document-requirement.util';

describe('isDocumentRequired', () => {
  it('exige documento quando a resposta bate com o type que pontua', () => {
    expect(isDocumentRequired(true, 'No', 'No')).toBe(true);
    expect(isDocumentRequired(true, 'Yes', 'Yes')).toBe(true);
  });

  it('não exige documento quando a resposta não bate com o type', () => {
    expect(isDocumentRequired(true, 'Yes', 'No')).toBe(false);
    expect(isDocumentRequired(true, 'No', 'Yes')).toBe(false);
    expect(isDocumentRequired(true, 'Not apply', 'Yes')).toBe(false);
  });

  it('não exige documento quando a questão não precisa de documento, mesmo respondendo certo', () => {
    expect(isDocumentRequired(false, 'Yes', 'Yes')).toBe(false);
  });
});
