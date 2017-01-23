import {filter, map, curry, compose, prop, head, pipe, propEq} from 'ramda';
import {filterTreeForMethodsAndFunctionsNamed} from 'estree-utils';

const extractTranslations = (...args) => (ast) => {

  const gettextFunctions = filterTreeForMethodsAndFunctionsNamed(...args)(ast);

  if (!gettextFunctions.length){
    return [];
  }

  const gettextFunctionsReceivingLiteral = filter(
    pipe(
      prop('arguments'),
      head,
      propEq('type', 'Literal')
    ),
    gettextFunctions
  );

  const gettextLocations = map((node) => node.loc.start)(gettextFunctionsReceivingLiteral);
  const firstArgument = compose(prop('value'), head, prop('arguments'));
  const translationStrings = map(firstArgument)(gettextFunctionsReceivingLiteral);

  const addLocation = (string) => {
    const location = gettextLocations[translationStrings.indexOf(string)];
    return {
      text: string,
      loc: {
        line: location.line,
        column: location.column
      }
    }
  }

  return map(addLocation)(translationStrings);
}

export default extractTranslations;
