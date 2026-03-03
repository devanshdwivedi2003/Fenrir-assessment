import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agree: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, agree } = formData;
    if (firstName && lastName && email && password && agree) {
      navigate("/dashboard");
    } else {
      alert("Please fill in all required fields and agree to the terms.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        background: "#090d11",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        .login-input:focus {
          outline: none;
          border-color: #0CC8A8 !important;
          box-shadow: 0 0 0 3px rgba(12,200,168,0.15) !important;
        }
        .login-input::placeholder { color: #AAAAAA; }
        @media (min-width: 1024px) {
          .login-layout { flex-direction: row !important; }
          .login-left  { width: 55% !important; display: flex !important; }
          .login-right { width: 45% !important; }
        }
        @media (max-width: 1023px) {
          .login-left { display: none !important; }
          .login-right { width: 100% !important; min-height: 100vh; }
        }
      `}</style>

      {/* ── Gradient layers matching screenshot ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Top-left teal bloom */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-10%",
            width: "60%",
            height: "70%",
            background:
              "radial-gradient(ellipse at 35% 35%, rgba(0,155,125,0.6) 0%, rgba(0,110,90,0.28) 38%, transparent 68%)",
            filter: "blur(55px)",
          }}
        />
        {/* Mid-left softer teal fill */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "2%",
            width: "45%",
            height: "55%",
            background:
              "radial-gradient(ellipse, rgba(0,130,105,0.16) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        {/* Bottom-right orange-red blast */}
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-12%",
            width: "80%",
            height: "90%",
            background:
              "radial-gradient(ellipse at 62% 68%, rgba(235,55,5,0.95) 0%, rgba(200,70,0,0.65) 22%, rgba(150,35,0,0.32) 48%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Centre-bottom warm bleed */}
        <div
          style={{
            position: "absolute",
            bottom: "-5%",
            right: "10%",
            width: "55%",
            height: "60%",
            background:
              "radial-gradient(ellipse, rgba(190,55,0,0.4) 0%, transparent 58%)",
            filter: "blur(110px)",
          }}
        />
      </div>

      {/* ── Layout ── */}
      <div
        className="login-layout"
        style={{ display: "flex", flex: 1, position: "relative", zIndex: 1 }}
      >
        {/* LEFT COLUMN */}
        <div
          className="login-left"
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "32px 40px",
            minHeight: "100vh",
            color: "#ffffff",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#0CC8A8",
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.02em",
              }}
            >
              aps
            </span>
          </div>

          {/* Hero */}
          <div
            style={{
              maxWidth: 630,
              marginTop: 80,
              marginBottom: "auto",
              paddingTop: 40,
            }}
          >
            <h1
              style={{
                fontSize: 46,
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: "0 0 40px 0",
              }}
            >
              Expert level Cybersecurity
              <br />
              in <span style={{ color: "#0CC8A8" }}>hours</span> not weeks.
            </h1>
            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 20px 0" }}>
              What's included
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {[
                "Effortlessly spider and map targets to uncover hidden security flaws",
                "Deliver high-quality, validated findings in hours, not weeks.",
                "Generate professional, enterprise-grade security reports automatically.",
              ].map((text, i) => (
                <li
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <svg
                    style={{
                      width: 18,
                      height: 18,
                      color: "#0CC8A8",
                      marginTop: 3,
                      flexShrink: 0,
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span
                    style={{ color: "#D1D5DB", fontSize: 15, lineHeight: 1.6 }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trustpilot */}
          <div style={{ marginBottom: 64 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <svg
                style={{ width: 20, height: 20, color: "#00b67a" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span style={{ fontWeight: 700, fontSize: 13 }}>Trustpilot</span>
            </div>
            <div>
              <span style={{ fontWeight: 600, fontSize: 16 }}>
                Rated 4.5/5.0{" "}
              </span>
              <span style={{ color: "#8d8d8d", fontSize: 11 }}>
                (100k+ reviews)
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          className="login-right"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 48px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              color: "#1A1A1A",
              borderRadius: 20,
              padding: "40px",
              width: "100%",
              maxWidth: 480,
              boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: "0 0 8px 0",
                  color: "#1A1A1A",
                }}
              >
                Sign up
              </h2>
              <p style={{ fontSize: 14, color: "#6B7280", margin: 0 }}>
                Already have an account?{" "}
                <a
                  href="#"
                  style={{
                    color: "#0CC8A8",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Log in
                </a>
              </p>
            </div>

            <form
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
              onSubmit={handleSubmit}
            >
              <input
                className="login-input"
                name="firstName"
                required
                onChange={handleChange}
                type="text"
                placeholder="First name*"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: "1px solid #E5E5E5",
                  background: "#FFFFFF",
                  color: "#1A1A1A",
                  fontSize: 14,
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
              />

              <input
                className="login-input"
                name="lastName"
                required
                onChange={handleChange}
                type="text"
                placeholder="Last name*"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: "1px solid #E5E5E5",
                  background: "#FFFFFF",
                  color: "#1A1A1A",
                  fontSize: 14,
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
              />

              <input
                className="login-input"
                name="email"
                required
                onChange={handleChange}
                type="email"
                placeholder="Email address*"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  border: "1px solid #E5E5E5",
                  background: "#FFFFFF",
                  color: "#1A1A1A",
                  fontSize: 14,
                  transition: "border-color 0.15s, box-shadow 0.15s",
                }}
              />

              <div style={{ position: "relative" }}>
                <input
                  className="login-input"
                  name="password"
                  required
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (8+ characters)*"
                  style={{
                    width: "100%",
                    padding: "14px 56px 14px 16px",
                    borderRadius: 10,
                    border: "1px solid #E5E5E5",
                    background: "#FFFFFF",
                    color: "#1A1A1A",
                    fontSize: 14,
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#9CA3AF",
                    display: "flex",
                    padding: 0,
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      style={{ width: 20, height: 20 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      style={{ width: 20, height: 20 }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
              >
                <input
                  name="agree"
                  required
                  onChange={handleChange}
                  type="checkbox"
                  id="terms"
                  style={{
                    marginTop: 2,
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    accentColor: "#0CC8A8",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                />
                <label
                  htmlFor="terms"
                  style={{
                    fontSize: 13,
                    color: "#1A1A1A",
                    lineHeight: 1.5,
                    cursor: "pointer",
                  }}
                >
                  I agree to Aps's{" "}
                  <a
                    href="#"
                    style={{ color: "#0056D2", textDecoration: "underline" }}
                  >
                    Terms & Conditions
                  </a>{" "}
                  and acknowledge the{" "}
                  <a
                    href="#"
                    style={{ color: "#0056D2", textDecoration: "underline" }}
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#0CC8A8",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "15px 0",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  marginTop: 4,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#0aaf93")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0CC8A8")
                }
              >
                Create account
              </button>
            </form>

            {/* Social Logins */}
            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
              <button
                style={{
                  flex: 1,
                  height: 48,
                  background: "#000",
                  borderRadius: 999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#222")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#000")
                }
                aria-label="Sign up with Apple"
              >
                <svg
                  style={{ width: 20, height: 20, color: "#fff" }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.84 1.5.05 2.78.8 3.52 1.96-3.02 1.88-2.52 5.95.42 7.15-.65 1.53-1.6 3.12-2.52 3.9zm-3.56-14.7c.6-1.55-.42-3.15-1.92-3.35-.55 1.62.63 3.13 1.92 3.35z" />
                </svg>
              </button>

              <button
                style={{
                  flex: 1,
                  height: 48,
                  background: "#F9F9F9",
                  borderRadius: 999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #E5E5E5",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#F0F0F0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#F9F9F9")
                }
                aria-label="Sign up with Google"
              >
                <svg
                  style={{ width: 18, height: 18 }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>

              <button
                style={{
                  flex: 1,
                  height: 48,
                  background: "#3A6BFF",
                  borderRadius: 999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#2a5be0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#3A6BFF")
                }
                aria-label="Sign up with Meta"
              >
                <svg
                  style={{ width: 22, height: 22, color: "#fff" }}
                  viewBox="0 0 36 36"
                  fill="currentColor"
                >
                  <path d="M28.47 11.53c-3.23 0-5.73 1.9-8.08 5.14-1.28-1.84-2.67-3.32-4.13-4.32a9.61 9.61 0 0 0-5.63-1.6c-4.94 0-9.2 4.1-9.2 9.25 0 5.16 4.26 9.26 9.2 9.26 2.37 0 4.54-1.07 6.18-2.82 2.15 2.1 4.67 3.65 7.66 3.65 4.94 0 9.2-4.1 9.2-9.26 0-5.14-4.26-9.25-9.2-9.25zm-17.84 14.5c-2.9 0-5.4-2.36-5.4-5.45 0-3.1 2.5-5.46 5.4-5.46 1.83 0 3.44.92 4.54 2.45-1.57 2.13-2.9 4.38-4.54 8.46zm17.84 0c-2.55 0-4.9-1.5-6.9-3.8l.1-.18c2.4-4 4.8-6.07 6.8-6.07 2.9 0 5.4 2.36 5.4 5.46s-2.5 4.6-5.4 4.6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
