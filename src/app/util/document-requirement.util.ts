/**
 * Decide se uma questão do questionário exige upload de documento.
 *
 * Regra de negócio (confirmada com o time na Sprint 5.0, card c345217b):
 * documento é exigido quando a resposta dada PONTUA pra aquela questão
 * específica (bate com o `type` real da questão), não quando é 'Yes' por
 * padrão — várias questões reais têm `type: 'No'` como resposta que pontua
 * (thinksus-api/src/shared/utils/answer-data.ts).
 */
export function isDocumentRequired(
  documentNeeded: boolean,
  answer: string,
  type: string,
): boolean {
  return documentNeeded && answer === type;
}
