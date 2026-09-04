import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homeSource = await readFile(
  new URL("../client/src/pages/home.tsx", import.meta.url),
  "utf8",
);

const aboutSource = await readFile(
  new URL("../client/src/pages/about.tsx", import.meta.url),
  "utf8",
);

const adminSource = await readFile(
  new URL("../client/src/pages/admin.tsx", import.meta.url),
  "utf8",
);

test("public pages do not advertise fixed packages or prices", () => {
  const publicSource = `${homeSource}\n${aboutSource}\n${adminSource}`;

  assert.doesNotMatch(homeSource, /id="pricing"|id="calculator"/);
  assert.doesNotMatch(publicSource, /ر\.س|ريال|أسعار واضحة/);
  assert.doesNotMatch(homeSource, /باقة|باكج|التكلفة التقديرية|حاسبة الطلبات/);
});

test("home page presents the expanded digital services", () => {
  assert.match(homeSource, /برمجة وتصميم المواقع/);
  assert.match(homeSource, /تطوير التطبيقات/);
  assert.match(homeSource, /حلول رقمية للشركات/);
  assert.match(homeSource, /حلول مصممة حسب احتياجك/);
});

test("delivery journey covers software and company solutions", () => {
  assert.doesNotMatch(homeSource, /\(موقع، هوية، أو تصوير\)/);
  assert.match(homeSource, /نجمع التصميم والبرمجة والتقنية/);
  assert.match(homeSource, /نطلق الحل معك/);
});

test("about page reflects a full digital product partnership", () => {
  assert.match(aboutSource, /مواقع وتطبيقات وحلول رقمية/);
  assert.doesNotMatch(
    aboutSource,
    /لا نصنع صوراً فقط|محتوى بصري وحضور رقمي عالي الجودة دون الحاجة/,
  );
});

test("hero description keeps readable contrast on the light background", () => {
  assert.match(
    homeSource,
    /text-xl md:text-2xl text-foreground\/70 max-w-3xl/,
  );
});
