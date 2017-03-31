import { IMultipleChoice } from './question';

export interface ILearnItem {
    title: string;
    name: string;
}

export class PracticeProblem implements ILearnItem, IMultipleChoice {
    title: string;
    name: string;
    imagePath: string;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}

export class InteractiveMolecule implements ILearnItem {
    title: string;
    name: string;
    imagePath: string;
    imgWidth: number;
    imgPadding: number;
    colorLocationAssociations: IColorLocationAssociation[];
    compoundHotspots: IHotspot[];
}

export class MovementAnimation implements ILearnItem {
    title: string;
    name: string;
    options: AnimationOptions;
    objects: FabricObject[];
}

export class AnimationOptions {
    canvasSize: IDimension;
    relativeImgPath: string;
}

export interface FabricObject {
    image: string;
    startX: number;
    startY: number;
    movementLocked: string;
    controlLocked: string;
    text: ITextItem;
    movement: IMovement;
}

export interface ITextItem {
    value: string;
    left: number;
    top: number;
    fontSize: number;
}

export interface IMovement {
    destination: ICanvasLocation;
    origin: ICanvasLocation;
    on: string;
}

export interface IDimension {
    width: number;
    height: number;
}

export interface ICanvasLocation {
    x: number;
    y: number;
}

export interface IHotspot {
    name: string;
    y: number;
    x: number;
    size: number;
    color: string;
    text: string;
}

export interface IColorLocationAssociation {
    color: string;
    location: string;
    description: string;
}
