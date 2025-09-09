import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../theme/app_theme.dart';

class ActionRow extends StatelessWidget {
  const ActionRow({super.key});

  @override
  Widget build(BuildContext context) {
    final actions = const [
      (_ActionIconLabel(icon: 'assets/icons/snap.svg', label: 'Snap')),
      (_ActionIconLabel(icon: 'assets/icons/tryon.svg', label: 'Try On')),
      (_ActionIconLabel(icon: 'assets/icons/love.svg', label: 'Love It')),
    ];
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: actions,
    );
  }
}

class _ActionIconLabel extends StatelessWidget {
  final String icon;
  final String label;
  const _ActionIconLabel({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: label,
      child: Column(
        children: [
          Container(
            width: 72,
            height: 72,
            decoration: BoxDecoration(
              color: const Color(0xFF131C2B),
              borderRadius: AppRadii.card,
              border: Border.all(color: const Color(0xFF233049)),
            ),
            child: Center(
              child: SvgPicture.asset(
                icon,
                width: 28,
                height: 28,
                colorFilter: const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                semanticsLabel: label,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(label, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.white)),
        ],
      ),
    );
  }
}

