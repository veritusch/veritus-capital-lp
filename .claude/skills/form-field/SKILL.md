---
name: form-field
description: Guide for adding or modifying fields in the Veritus MultiStepForm. Use when the user asks to add a field, step, or conditional logic to the investor onboarding form.
allowed tools: Read, Edit, Grep
---

# Adding fields to MultiStepForm

The main form is at `src/components/forms/MultiStepForm.tsx` (~57KB).
Follow this exact sequence when adding a new field.

---

## 1. Add the field to the `FormData` interface

Optional fields use `?`. Required fields do not.

```ts
interface FormData {
  // ...existing fields...
  newField?: string;      // optional
  requiredField: string;  // required
}
```

Initialize in the `formData` state inside `useState<FormData>`:

```ts
const [formData, setFormData] = useState<FormData>({
  // ...
  newField: "",
});
```

---

## 2. Available field types (`StepType`)

```ts
type StepType = "text" | "email" | "tel" | "currency" | "select"
              | "textarea" | "cpf" | "cnpj" | "cep" | "date"
              | "rg" | "number" | "address";
```

| Type | Component | Notes |
|---|---|---|
| `text` | `TextInput` | Generic |
| `email` | `<input type="email">` | Validates format |
| `tel` | `PhoneInput` | International support |
| `currency` | `CurrencyInput` | Formats as BRL |
| `select` | Native `<select>` | Requires `options[]` |
| `cpf` | `CPFInput` | Validates check digits |
| `cnpj` | `CNPJInput` | Validates check digits |
| `cep` | `CEPInput` | Auto-fills address fields |
| `date` | `DateInput` | Format DD/MM/YYYY |
| `rg` | `RGInput` | Alphanumeric, 5–14 chars |
| `number` | `NumberInput` | Numeric |
| `address` | Special screen | Do not use for simple fields |

---

## 3. Add the step to the `steps` array (inside `useMemo`)

**Simple field** — add inside `baseSteps` at the desired position:

```ts
{
  name: "newField",
  label: "Question shown to the user?",
  type: "text",
  placeholder: "(Example value)",
  required: true,
},
```

**Select field** (type `select`):

```ts
{
  name: "newField",
  label: "Choose an option?",
  type: "select",
  required: true,
  options: [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
  ],
},
```

**Conditional field** — add outside `baseSteps` using an `if` block:

```ts
if (formData.parentField === "Sim") {
  baseSteps.push({
    name: "newField",
    label: "Conditional field?",
    type: "text",
    required: true,
  });
}
```

> When adding a conditional dependency, include the field in the `useMemo` deps array:
> ```ts
> }, [formData.desejaAdicionarHerdeiros, formData.newField, /* ... */]);
> ```

---

## 4. Validation (`canProceed`)

If the new type requires specific validation, add a block in the `canProceed()` method:

```ts
if (currentStep.type === "newType") {
  return Boolean(stringValue && stringValue.trim().length >= 3);
}
```

Already validated automatically: `email`, `tel`, `currency`, `cpf`, `cnpj`, `rg`, `cep`, `address`, `date`.

---

## 5. Include in the payload (`preparePayload`)

The payload is sent to Make.com via `/api/lead`. Add the field to the appropriate section:

```ts
// Inside preparePayload():
cliente: {
  // ...
  newField: cleanText(data.newField),
},
```

Available utility functions:
- `capitalize(text)` — Capitalizes each word
- `cleanText(text)` — Trims and removes extra whitespace

---

## Checklist

- [ ] Field added to `FormData` (interface + initial state)
- [ ] Step added to `steps` (inside `useMemo`)
- [ ] If conditional: dependency added to `useMemo` array
- [ ] Validation added to `canProceed` (if new type)
- [ ] Field included in `preparePayload`
