declare module '@gridscale/api-spec-converter' {
  export interface ConversionOptions {
    syntax?: 'yaml' | 'json'; // Replace with actual supported syntax options
    order?: 'openapi' | 'default'; // Replace with actual supported order options
  }

  export interface ConversionResult {
    stringify(options?: ConversionOptions): string;
  }

  export function convert(
    conversionParams: {
      /**
       * source format
       */
      from: string;
      /**
       * target format
       */
      to: string;
      /**
       * the source data. Should contain an object, or a string of the filename or url
       */
      source: string | object;
    },
    callback: (err: Error | null, converted: ConversionResult) => void
  ): void;

}