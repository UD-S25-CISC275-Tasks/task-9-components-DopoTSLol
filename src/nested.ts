import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let publishedQ: Question[] = [...questions];

    publishedQ = publishedQ.filter((qstn: Question): boolean => qstn.published);

    return publishedQ;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let nonEmptyQ: Question[] = [...questions];

    nonEmptyQ = nonEmptyQ.filter(
        (qstn: Question): boolean =>
            qstn.body !== "" ||
            qstn.expected !== "" ||
            qstn.options.length !== 0,
    );

    return nonEmptyQ;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    let foundQ: Question | undefined;

    [...questions].map(
        (qstn: Question): Question => (qstn.id === id ? (foundQ = qstn) : qstn),
    );

    if (foundQ === undefined) {
        //STOP SAYING THIS IS AN ERROR VSCODE. THIS IS INTENTIONAL RAAAAGHHHHH
        return null;
    } else {
        return foundQ;
    }
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let removedQ: Question[] = [...questions];

    if (findQuestion(removedQ, id) !== null) {
        removedQ = removedQ.filter((qstn: Question): boolean => qstn.id !== id);
    }

    return removedQ;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let q: Question[] = [...questions];
    let qNames: string[];

    qNames = q.map((ques: Question): string => ques.name);

    return qNames;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let q: Question[] = [...questions]; //I probally dont need this every time, but its good practice
    let pointsSum: number = 0;

    q.map((ques: Question): number => (pointsSum += ques.points));

    return pointsSum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return sumPoints(getPublishedQuestions([...questions]));
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let questionsCSV: string = "";
    let q: Question[] = [...questions];

    questionsCSV =
        "id,name,options,points,published\n" +
        [...q]
            .map(
                (ques: Question): string =>
                    ques.id.toString() +
                    "," +
                    ques.name +
                    "," +
                    ques.options.length.toString() +
                    "," +
                    ques.points +
                    "," +
                    ques.published,
            )
            .join("\n");
    return questionsCSV;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return [...questions].map(
        (ques: Question): Answer => ({
            questionId: ques.id,
            text: "",
            submitted: false,
            correct: false,
        }),
    );
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return [...questions].map(
        (ques: Question): Question => ({ ...ques, published: true }),
    );
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    let allSameType: boolean = true;
    if (questions.length !== 0) {
        let firstQuestionType: QuestionType = questions[0].type;

        [...questions].map(
            (ques: Question): boolean =>
                (allSameType = allSameType && ques.type === firstQuestionType),
        );
    }

    return allSameType;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    return [...questions].map(
        (ques: Question): Question =>
            ques.id === targetId ? { ...ques, name: newName } : ques,
    );
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    let changedQues: Question | null = findQuestion(questions, targetId);

    if (changedQues !== null) {
        let changedQues2: Question;

        if (changedQues.type === "multiple_choice_question") {
            changedQues2 = {
                ...changedQues,
                type: newQuestionType,
                options: [],
            };
        } else {
            changedQues2 = { ...changedQues, type: newQuestionType };
        }

        return [...questions].map(
            (ques: Question): Question =>
                targetId === ques.id ? changedQues2 : ques,
        );
    } else {
        return [...questions];
    }
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    let changedQues: Question | null = findQuestion(questions, targetId);

    if (changedQues !== null) {
        let changedQues2: Question;
        changedQues2 = { ...changedQues };

        if (targetOptionIndex === -1) {
            changedQues2.options = [...changedQues.options.concat(newOption)];
        } else {
            changedQues2.options = [...changedQues.options];
            changedQues2.options[targetOptionIndex] = newOption;
        }

        let newArr: Question[] = [...questions].map(
            (ques: Question): Question =>
                targetId === ques.id ? changedQues2 : ques,
        );

        return newArr;
    } else {
        return [...questions];
    }
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    let duplicateQ: Question[] = [...questions];
    let index = duplicateQ.findIndex((ques) => ques.id === targetId);
    let clonedQ: Question = duplicateQuestion(newId, duplicateQ[index]);
    duplicateQ.splice(index + 1, 0, clonedQ);

    return [...duplicateQ];
}
