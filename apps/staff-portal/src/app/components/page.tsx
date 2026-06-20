import { Button, Text, Input, CountrySelector, PhoneInput, Select, Textarea, OtpInput } from "@resonance/ui";
import { PlaceholderIcon } from "@resonance/ui/icons";
import { ToastTest } from "./toast-test";

const buttonVariants = [
  "primary",
  "secondary",
  "tertiary",
  "neutral",
  "transparent",
  "danger",
  "warning",
  "green",
] as const;

const buttonSizes = ["regular", "medium", "small"] as const;

const textVariants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "bodyLarge",
  "bodyRegular",
  "bodySmall",
  "bodyXSmall",
  "button",
  "buttonXS",
] as const;

export default function Components() {
  return (
    <div className="p-8 flex flex-col gap-24">

      {/* Toast */}
      <ToastTest />

      {/* Buttons */}
      <section className="flex flex-col gap-8">
        <Text variant="h4" className="text-primary">Buttons</Text>

        {buttonSizes.map((size) => (
          <div key={size} className="flex flex-col gap-4">
            <Text variant="bodySmall" className="text-secondary capitalize">{size}</Text>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Text variant="bodyXSmall" className="text-tertiary">Default</Text>
                <div className="flex items-center flex-wrap gap-3">
                  {buttonVariants.map((variant) => (
                    <Button
                      key={variant}
                      variant={variant}
                      size={size}
                      leftIcon={<PlaceholderIcon />}
                      rightIcon={<PlaceholderIcon />}
                    >
                      Button
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Text variant="bodyXSmall" className="text-tertiary">Disabled</Text>
                <div className="flex items-center flex-wrap gap-3">
                  {buttonVariants.map((variant) => (
                    <Button
                      key={variant}
                      variant={variant}
                      size={size}
                      disabled
                      leftIcon={<PlaceholderIcon />}
                      rightIcon={<PlaceholderIcon />}
                    >
                      Button
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Text variant="bodyXSmall" className="text-tertiary">Loading</Text>
                <div className="flex items-center flex-wrap gap-3">
                  {buttonVariants.map((variant) => (
                    <Button
                      key={variant}
                      variant={variant}
                      size={size}
                      loading
                      leftIcon={<PlaceholderIcon />}
                      rightIcon={<PlaceholderIcon />}
                    >
                      Button
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Typography */}
      <section className="flex flex-col gap-8">
        <Text variant="h4" className="text-primary">Typography</Text>

        <div className="flex flex-col gap-6">
          {textVariants.map((variant) => (
            <div key={variant} className="flex flex-col gap-1">
              <Text variant="bodyXSmall" className="text-tertiary">{variant}</Text>
              <Text variant={variant} className="text-primary">
                The quick brown fox jumps over the lazy dog
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* Inputs */}
      <section className="flex flex-col gap-8">
        <Text variant="h4" className="text-primary">Inputs</Text>

        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          <Input
            label="Default"
            placeholder="Input"
          />

          <Input
            label="Required"
            placeholder="Input"
            required
          />

          <Input
            label="With hint"
            placeholder="Input"
            hint="This is a hint message"
          />

          <Input
            label="With left icon"
            placeholder="Input"
            leftIcon={<PlaceholderIcon />}
          />

          <Input
            label="With right icon"
            placeholder="Input"
            rightIcon={<PlaceholderIcon />}
          />

          <Input
            label="With both icons"
            placeholder="Input"
            leftIcon={<PlaceholderIcon />}
            rightIcon={<PlaceholderIcon />}
          />

          <Input
            label="Error state"
            placeholder="Input"
            error="This field is required"
            leftIcon={<PlaceholderIcon />}
            required
          />

          <Input
            label="Password"
            placeholder="Input"
            type="password"
            required
          />

          <Input
            label="Disabled"
            placeholder="Input"
            disabled
          />

          <Input
            label="Disabled with value"
            value="Some value"
            disabled
            readOnly
          />

          <PhoneInput
            label="Phone Number"
            required
          />

          <PhoneInput
            label="Phone Number (error)"
            required
            error="Invalid phone number"
          />

          <PhoneInput
            label="Phone Number (disabled)"
            required
            disabled
          />
        </div>
      </section>

      {/* OTP Input */}
      <section className="flex flex-col gap-8">
        <Text variant="h4" className="text-primary">OTP Input</Text>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Text variant="bodyXSmall" className="text-tertiary">Default (6 digits)</Text>
            <OtpInput label="Verification code" />
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="bodyXSmall" className="text-tertiary">With hint</Text>
            <OtpInput label="Verification code" hint="Enter the 6-digit code sent to your email" />
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="bodyXSmall" className="text-tertiary">Partially filled</Text>
            <OtpInput label="Verification code" value="384" />
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="bodyXSmall" className="text-tertiary">Error state</Text>
            <OtpInput label="Verification code" value="123456" error="Invalid code. Please try again." />
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="bodyXSmall" className="text-tertiary">4 digits</Text>
            <OtpInput label="PIN" length={4} />
          </div>

          <div className="flex flex-col gap-2">
            <Text variant="bodyXSmall" className="text-tertiary">Disabled</Text>
            <OtpInput label="Verification code" value="384" disabled />
          </div>
        </div>
      </section>

      {/* Textarea */}
      <section className="flex flex-col gap-8">
        <Text variant="h4" className="text-primary">Textarea</Text>

        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          <Textarea
            label="Default"
            placeholder="Enter text..."
          />

          <Textarea
            label="Required"
            placeholder="Enter text..."
            required
          />

          <Textarea
            label="With hint"
            placeholder="Enter text..."
            hint="This is a hint message"
          />

          <Textarea
            label="Error state"
            placeholder="Enter text..."
            error="This field is required"
            required
          />

          <Textarea
            label="Disabled"
            placeholder="Enter text..."
            disabled
          />

          <Textarea
            label="Disabled with value"
            defaultValue="Some existing content that cannot be edited."
            disabled
          />
        </div>
      </section>

      {/* Select */}
      <section className="flex flex-col gap-8">
        <Text variant="h4" className="text-primary">Select</Text>

        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          <Select
            label="Default"
            placeholder="Select an option"
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />

          <Select
            label="Required"
            required
            placeholder="Select an option"
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />

          <Select
            label="With hint"
            placeholder="Select an option"
            hint="This is a hint message"
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />

          <Select
            label="With left icon"
            placeholder="Select an option"
            leftIcon={<PlaceholderIcon />}
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />

          <Select
            label="With selected value"
            value="two"
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />

          <Select
            label="Error state"
            placeholder="Select an option"
            error="This field is required"
            required
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />

          <Select
            label="Disabled"
            placeholder="Select an option"
            disabled
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />

          <Select
            label="Disabled with value"
            value="one"
            disabled
            options={[
              { label: "Option one", value: "one" },
              { label: "Option two", value: "two" },
              { label: "Option three", value: "three" },
            ]}
          />
        </div>
      </section>

    </div>
  );
}
