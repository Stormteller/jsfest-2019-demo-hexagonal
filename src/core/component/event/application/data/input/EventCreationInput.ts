import {EventType} from '../../../domain/data/EventType';
import {IsDate, IsDateString, IsEnum, IsNumber, IsString} from 'class-validator';
import {TransformToDate} from '../../../../../sharedKernel/annotations/transformers';

export class EventCreationInput {
    @IsString()
    title: string;

    @IsDate()
    @TransformToDate
    startDate: Date;

    @IsDate()
    @TransformToDate
    endDate: Date;

    @IsEnum(EventType)
    eventType: EventType;
}
