import {Transform} from 'class-transformer';

export function TransformToDate(target: any, key: string) {
    Transform(value => value ? new Date(value) : null)(target, key);
}
