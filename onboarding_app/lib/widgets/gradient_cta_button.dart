import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class GradientCTAButton extends StatefulWidget {
  final String label;
  final VoidCallback onPressed;

  const GradientCTAButton({super.key, required this.label, required this.onPressed});

  @override
  State<GradientCTAButton> createState() => _GradientCTAButtonState();
}

class _GradientCTAButtonState extends State<GradientCTAButton> {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final media = MediaQuery.of(context);
    final bool disableAnims = media.disableAnimations;
    return Semantics(
      button: true,
      label: widget.label,
      child: GestureDetector(
        onTapDown: (_) => setState(() => _pressed = true),
        onTapCancel: () => setState(() => _pressed = false),
        onTapUp: (_) => setState(() => _pressed = false),
        onTap: widget.onPressed,
        child: AnimatedScale(
          duration: disableAnims ? Duration.zero : const Duration(milliseconds: 160),
          scale: _pressed ? 0.98 : 1.0,
          child: Container(
            height: 64,
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: AppColors.ctaGradient,
              borderRadius: AppRadii.pill,
            ),
            alignment: Alignment.center,
            child: Text(
              widget.label,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w700,
                fontSize: 18,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

