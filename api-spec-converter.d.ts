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
      from: string;
      to: string;
      source: string;
    },
    callback: (err: Error | null, converted: ConversionResult) => void
  ): void;

}