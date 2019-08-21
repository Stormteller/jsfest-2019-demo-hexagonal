export interface Converter<F, T> {
    from(from: F): T;
    to(to: T): F;
}
